export class CommonUtils {
    static { this.isNullOrUndefinedOrEmpty = function (object) {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    }; }
    static { this.isNullOrUndefined = function (object) {
        return object === null || object === undefined;
    }; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvY29tbW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxXQUFXO2FBRWYsNkJBQXdCLEdBQUcsVUFBVSxNQUFXO1FBQ3JELE9BQU8sV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLENBQUM7SUFDaEUsQ0FBQyxDQUFDO2FBRUssc0JBQWlCLEdBQUcsVUFBVSxNQUFXO1FBQzlDLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxDQUFDO0lBQ2pELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21tb25VdGlscyB7XG5cbiAgc3RhdGljIGlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eSA9IGZ1bmN0aW9uIChvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChvYmplY3QpIHx8IG9iamVjdCA9PT0gJyc7XG4gIH07XG5cbiAgc3RhdGljIGlzTnVsbE9yVW5kZWZpbmVkID0gZnVuY3Rpb24gKG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9iamVjdCA9PT0gbnVsbCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZDtcbiAgfTtcbn1cbiJdfQ==