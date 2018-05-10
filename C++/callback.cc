#include <node.h>

namespace callback {
  using v8::Function;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Null;
  using v8::Object;
  using v8::String;
  using v8::Value;

  static void RunCallback(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();
    Local<Function> cb = Local<Function>::Cast(args[0]); // V8通过Local<Function>的Cast方法吧JS类型转换为V8里的Function类型
    const unsigned argc = 1; // 函数的参数个数为1
    Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "Hello, World!") }; // 声明一个参数的list，长度为1，内容为V8的String类型的hello world
    cb->Call(Null(isolate), argc, argv); // 调用cb，环境为isolate，参数个数为1，参数数组为argv
  }

  static void Init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", RunCallback);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
}