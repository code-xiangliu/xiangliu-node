import { GlobalStore } from './global.d';
export declare const globalStore: GlobalStore;
interface RegisterInfo {
    key: string;
    requirements: string | string[] | null;
}
export declare const register: (registerInfo: RegisterInfo | {
    key: string;
}) => void;
declare const useService: () => void;
export default useService;
