---
title: pymongo
date: 2023-09-28 11:07:01
tags: pymongo
---
### 在python中使用mongodb中返回的ObjectId中不能被json序列化的问题

```python
import json
from bson.objectid import ObjectId

# 序列化
json.dumps(ObjectId())
# 反序列化
json.loads(json.dumps(ObjectId()))
```





### 参考链接
[fastapi-issues-with-mongodb-typeerror-objectid-object-is-not-iterable](https://stackoverflow.com/questions/71467630/fastapi-issues-with-mongodb-typeerror-objectid-object-is-not-iterable)
[Handling MongoDB ObjectId in Python-fastAPI](https://medium.com/@madhuri.pednekar/handling-mongodb-objectid-in-python-fastapi-4dd1c7ad67cd)
[Getting Started with MongoDB and FastAPI](https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/)
