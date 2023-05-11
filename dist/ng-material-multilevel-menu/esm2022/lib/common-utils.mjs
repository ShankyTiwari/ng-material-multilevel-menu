class CommonUtils {
    static isNullOrUndefinedOrEmpty = function (object) {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    };
    static isNullOrUndefined = function (object) {
        return object === null || object === undefined;
    };
}
export { CommonUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvY29tbW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQWEsV0FBVztJQUV0QixNQUFNLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxNQUFXO1FBQ3JELE9BQU8sV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLENBQUM7SUFDaEUsQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsTUFBVztRQUM5QyxPQUFPLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNqRCxDQUFDLENBQUM7O1NBUlMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb25VdGlscyB7XHJcblxyXG4gIHN0YXRpYyBpc051bGxPclVuZGVmaW5lZE9yRW1wdHkgPSBmdW5jdGlvbiAob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChvYmplY3QpIHx8IG9iamVjdCA9PT0gJyc7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGlzTnVsbE9yVW5kZWZpbmVkID0gZnVuY3Rpb24gKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gb2JqZWN0ID09PSBudWxsIHx8IG9iamVjdCA9PT0gdW5kZWZpbmVkO1xyXG4gIH07XHJcbn1cclxuIl19