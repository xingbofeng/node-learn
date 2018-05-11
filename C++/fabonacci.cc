#include <node.h>

namespace fabonacci {

  using namespace v8;

  static inline size_t runFabonacci(size_t n) {
    if (n == 0)
    {
      return 0;
    }
    if (n == 1)
    {
      return 1;
    }
    return runFabonacci(n - 1) + runFabonacci(n - 2);
  }

  static void Fabonacci(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    // 检查参数类型
    if (!args[0]->IsNumber())
    {
      isolate->ThrowException(Exception::Error(String::NewFromUtf8(isolate, "argument type must be Number")));
    }
    size_t n = args[0]->NumberValue();
    Local<Number> num = Number::New(isolate, runFabonacci(n));
    args.GetReturnValue().Set(num);
  }

  void init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", Fabonacci);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}