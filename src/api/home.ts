import { apiUrl } from '@/const/api';
import qs from 'qs';
import axiosInstance from '@/uitls/request';

export const getPlayerInfo = (params?: any) => {
	return axiosInstance.post(apiUrl.RPI_API,qs.stringify({aid: params.aid, idc: params.idCard, rn: params.realName, px: params.proxy}));
};

export const confirmPlayerInfo = (params?: any) => {
	return axiosInstance.post(apiUrl.CI_API,qs.stringify({aid: params.aid, idc: params.idCard, px: params.proxy}));
};
