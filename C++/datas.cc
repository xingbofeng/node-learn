#include <node.h>

namespace datas {
  using namespace v8;

  static void MyFunction(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "MyFunctionReturn"));
  }

  static void Datas(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();

    // 声明一个V8的Object类型的变量
    Local<Object> object = Object::New(isolate);
    // 声明一个V8的Number类型的变量
    Local<Number> number = Number::New(isolate, 0);
    // 声明一个V8的String类型的变量
    Local<String> string = String::NewFromUtf8(isolate, "string");
    // 声明一个V8的Function类型的变量
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
    Local<Function> func = tpl->GetFunction();
    // 声明一个V8的Array类型的变量
    Local<Array> array = Array::New(isolate);
    // 给array赋值
    for (int i = 0; i < 10; ++i)
    {
      array->Set(i, Number::New(isolate, i));
    }
    // 声明一个V8的Boolean类型的变量
    Local<Boolean> boolean = Boolean::New(isolate, true);
    // 声明一个V8的Undefined类型的变量
    Local<Value> undefined = Undefined(isolate);
    // 声明一个V8的Null类型的变量
    Local<Value> nu = Null(isolate);
    // 设定函数的名称
    func->SetName(String::NewFromUtf8(isolate, "MyFunction"));
    // 给对象赋值
    object->Set(String::NewFromUtf8(isolate, "number"), number);
    object->Set(String::NewFromUtf8(isolate, "string"), string);
    object->Set(String::NewFromUtf8(isolate, "function"), func);
    object->Set(String::NewFromUtf8(isolate, "array"), array);
    object->Set(String::NewFromUtf8(isolate, "boolean"), boolean);
    object->Set(String::NewFromUtf8(isolate, "undefined"), undefined);
    object->Set(String::NewFromUtf8(isolate, "null"), nu);
    args.GetReturnValue().Set(object);
  }

  static void init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", Datas);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}