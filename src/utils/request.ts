/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit, ResponseError } from 'umi-request';
import { notification } from 'antd';
import { notice } from '@/components/Exception';
import { ApiResponse } from '@/utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError): void => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
      duration: null,
    });
  } else if (!response) {
    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器',
      duration: null,
    });
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  /* 默认错误处理 */
  errorHandler,
  /* 默认请求是否带上cookie */
  credentials: 'include',
  // getResponse: true,
});

/* request拦截器, 改变url 或 options. */
const requestInterceptor = (url: string, options: RequestOptionsInit) => {};

/**
 * response 拦截器, 处理 response
 * @param response Response
 * @param options RequestOptionsInit
 */
const responseInterceptor = async (response: Response, options: RequestOptionsInit) => {
  const token = response.headers.get('x-auth-token');
  if (token) {
    localStorage.setItem('x-auth-token', token);
  }

  const apiData: ApiResponse = await response.clone().json();
  const { code, message, data } = apiData;

  /* API 返回异常提示处理 */
  if (code && code !== `${0}`) {
    notice(apiData);
  }

  return response;
};

// request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

export default request;
