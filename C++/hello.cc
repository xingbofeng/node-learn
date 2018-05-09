#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void World(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, " World!"));
}

void Hello(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello,"));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Hello);
  NODE_SET_METHOD(exports, "world", World);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, init)

}