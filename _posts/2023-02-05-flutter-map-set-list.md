---
layout: article
title: Flutter List, Set, Map
date: 2023-02-05 00:26:33 +0700
modified_date:
categories: dart
permalink: /dart/flutter-map-set-list
tags:
- Map
- List
- Set
- Dart
author:
- Thea Choem
---

Recorded code from E-Robot mobile development sharing session on Sat, 5 Feb 2023. Feel free to ask any questions in comment section below.

## 1. List

```dart
import 'dart:math';

class Dummy {}

void main() {
  // DECLARE
  List dynamicList = ["1", 2, 2.2, {}, Dummy()]; // #1
  List<String> strList = ["a", "b", "c", "d"];
  List<int> intList = [1, 2, 3, 4, 5, 6];

  // REMOVE
  intList.remove(1); // [2, 3, 4, 5, 6]
  intList.removeAt(0); // [3, 4, 5, 6]
  intList.removeLast(); // [3, 4, 5]
  intList.removeRange(0, 3); // []

  // INSERT
  // []
  // intList[0] = 1; // raise error
  intList.add(1); // [1]
  intList.insert(1, 2); // [1, 2]
  intList.insertAll(2, [3, 4, 5, 6]); // [1, 2, 3, 4, 5, 6]

  // MIN, MAX -> List<number>
  int minValue = intList.reduce(min);
  int maxValue = intList.reduce(max);

  print(minValue); // 1
  print(maxValue); // 6

  // REVERSE
  List<int> reversedList = intList.reversed.toList(); // [6, 5, 4, 3, 2, 1]

  // CLONE
  List<int> clonedList = [...intList]..clear(); // []
  print(clonedList); // []
  print(intList); // [1, 2, 3, 4, 5, 6]

  // SEARCH ELEMENT
  intList.where((element) => element > 4); // [5, 6]

  dynamicList.where((element) => element is int); // [2]
  dynamicList.whereType<int>(); // [2]
  dynamicList.whereType<Dummy>(); // [Dummy()]

  // SEARCH ELEMENT INDEX
  intList.indexWhere((element) => element == 4); // 3;

  // SHFFLE
  List<int> listToSuffle = [...intList];
  listToSuffle.shuffle();
  print(listToSuffle); // [6, 4, 1, 5, 2, 3]

  // SET
  intList.toSet();
}
```

## 2. Set
```dart
void main() {
  List<int> ids = [1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 7];

  // Set<int> uniqueIds = {1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 7};
  Set<int> uniqueIds = ids.toSet();

  print(uniqueIds); // {1, 2, 3, 4, 5, 6, 7}

  // Definition:
  // List: value - no uniqueness
  // Set: key - alway unqiue
  // Map: key:value - unqiue by key
}
```

## 3. Map

```dart
void main() {
  // JSON
  // python: dictionary
  // java: Map
  // js: Map
  // ruby: hash

  Map contents = {
    'id': 0,
    'name': 'San',
    'email': 'san@gmail.com',
    'single': true,
    'billing_address': null,
    'shipping_address': null,
  };

  contents = removeKeyAndValueInMap(contents); // name, email, single
  contents = addAndUpdateValueInMap(contents); // name, email, single, dob, created_at
  contents = updateIfNotExistInMap(contents); // name, email, single, dob, created_at, role
  contents = cloneMap(contents); // name, email, single, dob, created_at, role
  contents = searchMap(contents); // name, email, single, dob, created_at, role
  contents = typeMap(contents);

  print(contents.keys);
}

Map removeKeyAndValueInMap(Map contents) {
  contents.removeWhere((key, value) => key == 'id'); // (name, email, single, billing_address, shipping_address)
  contents.remove('id'); // (name, email, single, billing_address, shipping_address)
  contents.removeWhere((_, value) => value == null); // (name, email, single)

  return contents;
}

Map addAndUpdateValueInMap(Map contents) {
  // set & update
  contents['dob'] = '2002-02-29';
  contents['dob'] = '2003-04-31';

  // update & return value
  String dob = contents.update('dob', (value) => '2004-02-27'); // dob = '2004-02-27'
  String createdAt = contents.update('created_at', (value) => '2023-12-23', ifAbsent: () => '2021-01-01');

  return contents;
}

// contents: name, email, single, dob, created_at
Map updateIfNotExistInMap(Map contents) {
  // method #1
  if (!contents.containsKey('role')) {
    contents['role'] = 'User';
  }

  // method #2
  contents.putIfAbsent('role', () => 'Marketing'); // role: User
  contents.putIfAbsent('role', () => 'Admin'); // role: User

  return contents;
}

Map cloneMap(Map contents) {
  Map clonedMap = {...contents}; // spread operator

  // test
  clonedMap.removeWhere((key, value) => value is! String);

  // clonedMap = {
  //   "name": "San",
  //   "email": "san@gmail.com",
  //   "dob": "2004-02-27",
  //   "created_at": "2021-01-01",
  //   "role": "User",
  // }

  // contents still same after remove since we remove in cloned map
  return contents;
}

Map searchMap(Map contents) {
  bool isDateTime(String value) {
    return DateTime.tryParse(value) != null;
  }

  // step1: convert to list with .entries
  // contents.entries; # List<Object> : object.key, object.value
  var entires = contents.entries;

  // step2: start searching with .where
  // Iterable<MapEntry<dynamic, dynamic>> result;
  var result = entires.where((element) => isDateTime(element.value.toString()));

  // step3: convert back to map
  contents = Map.fromEntries(result);

  return contents;
}

// dart is type-language
// ruby, javascript is dynamic language
//
// typescript: is javascript, add type (type-language)

Map typeMap(Map contents) {
  int value = 1;

  Map<dynamic, dynamic> contents1 = {
    1: 'dkdk',
    '2': 2.2,
  };

  Map<String, String> contents2 = {
    '1': 'a',
    '2': 'b',
  };

  Map<String, dynamic> json = {
    'id': 1,
    'first_name': 'San',
    'address': {'id': 2, 'address1': '#123'},
    'comments': [
      {'id': 1, 'comment': 'I like it'},
      {'id': 2, 'comment': 'No...'},
    ],
  };

  return contents;
}

// BONUS:
// JSON serializer: https://pub.dev/packages/json_serializable
// Firebase, API response, mongo, ...
// Map, JSON, Collection, Document

// Example:
// response from fetchApi
// user = UserModel(username: response['username'], firstName: ['first_name'])

class UserModel {
  final String username;
  final String firstName; // lowerCamalCase => snackCase
  final String lastName; // firstName => first_name

  UserModel({
    required this.username,
    required this.firstName,
    required this.lastName,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      username: json['username'],
      firstName: json['first_name'],
      lastName: json['last_name'],
    );
  }
}
```