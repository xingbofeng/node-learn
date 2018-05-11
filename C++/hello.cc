#include <node.h>

namespace helloWorld {

  using namespace v8;

  static void HelloWorld(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
  }

  static void init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", HelloWorld);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}