1. ### Object-c的类可以多重继承么?可以实现多个接口么?Category是什么?重写一个类的方式用继承好还是分类好?为什么?
- #### 答： Object-c的类不可以多重继承;可以实现多个接口，通过实现多个接口可以完成C++的多重继承;Category是类别，一般情况用分类好，用Category去重写类的方法，仅对本Category有效，不会影响到其他类与原有类的关系。

2. ### #import 跟#include 又什么区别，@class呢, #import<> 跟 #import””又什么区别?
- #### 答：#import是Objective-C导入头文件的关键字，#include是C/C++导入头文件的关键字,使用#import头文件会自动只导入一次，不会重复导入，相当于#include和#pragma once;@class告诉编译器某个类的声明，当执行时，才去查看类的实现文件，可以解决头文件的相互包含;#import<>用来包含系统的头文件，#import””用来包含用户头文件。
3. ### 属性readwrite，readonly，assign，retain，copy，nonatomic 各是什么作用，在那种情况下用?
- #### 答：
  1). readwrite 是可读可写特性;需要生成getter方法和setter方法时    
  2). readonly 是只读特性 只会生成getter方法 不会生成setter方法 ;不希望属性在类外改变     
  3). assign 是赋值特性，setter方法将传入参数赋值给实例变量;仅设置变量时; 
  4). retain 表示持有特性，setter方法将传入参数先保留，再赋值，传入参数的retaincount会+1;

5). copy 表示赋值特性，setter方法将传入对象复制一份;需要完全一份新的变量时。

6).nonatomic 非原子操作，决定编译器生成的setter getter是否是原子操作，atomic表示多线程安全，一般使用nonatomic