#include <node.h>

using namespace v8;

void DeepClone(const FunctionCallbackInfo<Value> &args) {

  Local<Object> js_obj = Local<Object>::Cast(args[0]);
  Local<Object> cloned_js_obj = js_obj->Clone();

  args.GetReturnValue().Set(cloned_js_obj);
}

void init (Local<Object> exports) {
  NODE_SET_METHOD(exports, "DeepClone", DeepClone);
}

NODE_MODULE(DeepClone, init);
