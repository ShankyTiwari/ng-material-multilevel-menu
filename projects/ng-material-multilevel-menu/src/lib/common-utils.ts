export class CommonUtils {
    static isNullOrUndefinedOrEmpty = function (object: any): boolean {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    };

    static isNullOrUndefined = function (object: any): boolean {
        return object === null || object === undefined;
    };
}
