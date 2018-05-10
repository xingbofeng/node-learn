#include <node.h>

namespace hello {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void HelloWorld(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
}

void init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", HelloWorld);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}