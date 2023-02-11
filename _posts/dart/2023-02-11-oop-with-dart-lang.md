---
layout: article
title: OOP with Dart Lang
date: 2023-02-11
modified_date:
categories: dart
permalink: /dart/oop-with-dart-lang
tags:
- OOP
- Dart
author:
- Thea Choem
---

Recorded code from E-Robot mobile development sharing session on Sat, 11 Feb 2023. Feel free to ask any questions in comment section below.

## Introduction
When we things of:
- Flutter: Everythings is Widgets
- Dart: Everythings is Object/Class

### What & Why OOP?
OOP: Object Oriented Programming
- Reusable of code
- Clean code
- Easier to understand the code, its relationships
  Like parent or child has relationship with each other.

### OOP's 4 elements:
- Inheritance: extends (inherit its parent)
- Abstract: prevent parent declaration + empty body method.
- Polymorphism: overload & override.
- Encapsulation: expose only selected information: with public & private

## Let's practice OOP with Dart

```dart
// ignore_for_file: unused_local_variable

void main() {
  // Cars
  Car toyota = Car(0, 'toyota');
  Car lexus = Car(1, 'lexus');

  toyota.forward('tta-key');
  toyota.backward('tta-key');

  toyota._accidents; // error: can't access
  toyota.sellable(); // can access

  // Motos
  Motor susuke = Motor(0, 'susuke');
  susuke.forward('ssk-key');

  // Bikes
  Bike bmx = Bike(0, 'BMX-123');
  bmx.forward();
}

abstract class Vehicle {
  final int id;
  final String name;

  Vehicle(this.id, this.name);

  String plat() {
    return '$id$name';
  }

  void forward();
  void backward();
}

class Car extends Vehicle {
  Car(super.id, super.name);

  List<Map> get _accidents {
    return [
      {'1': 1, '2': 2}
    ];
  }

  bool sellable() {
    return _accidents.length < 30;
  }

  @override
  void forward([String? key]) {
    // បើកទ្វា
    // ដាក់លេខ
    // Go, go
  }

  @override
  void backward([String? key]) {
    // បើកទ្វា
    // ដាក់លេខ
    // Back, back
  }
}

class Motor extends Vehicle {
  Motor(super.id, super.name);

  @override
  void forward([String? key]) {
    // ឡើង motor
    // ចាក់សោ
    // Let's go
  }

  @override
  void backward() {
    // យកជើងទាញ
  }
}

class Bike extends Vehicle {
  Bike(super.id, super.name);

  @override
  void forward() {
    // ឡើងកង់
    // ធាក់
  }

  @override
  void backward() {
    // យកជើងទាញ
  }

  @override
  String plat() {
    return 'null';
  }
}
```