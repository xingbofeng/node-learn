#include <node.h>

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  double result = 0.0;
  for (int i = 0; i < args.Length(); ++i)
  {
    // check grguments type
    if (!args[i]->IsNumber())
    {
      isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "arguments type must be Number")));
      return;
    }
    result += args[i]->NumberValue();
  }
  Local<Number> num = Number::New(isolate, result);

  // set return
  args.GetReturnValue().Set(num);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}