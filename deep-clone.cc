#include <node.h>

using namespace v8;

void DeepClone(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  // strings can't be cloned
  if (args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(
        isolate,
        "Strings cannot be cloned."
      )
    ));
    // throwing doesn't stop execution; so, return
    return;
  } else if (args.Length() > 1) {
    /* not an error, per se, but I want folks to know that multiple objects
     * can't be cloned at once; they must be iterated over.
     *
     * This isn't really a TypeError, but I couldn't think of a better type
     * for it. Loosely, it's a TypeError by being a type when I expect there
     * to be no type.
     * */
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(
        isolate,
        "Too many arguments."
      )
    ));
    // throwing doesn't stop execution; so, return
    return;
  }

  Local<Object> js_obj = Local<Object>::Cast(args[0]);
  Local<Object> cloned_js_obj = js_obj->Clone();

  args.GetReturnValue().Set(cloned_js_obj);
}

void init (Local<Object> exports) {
  NODE_SET_METHOD(exports, "DeepClone", DeepClone);
}

NODE_MODULE(DeepClone, init);
