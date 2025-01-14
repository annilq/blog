---
title: 百度地图坐标与微信地图坐标转换
date: 2025-01-04 09:26:01
tags: javascript
---
前提：之前公司的项目有定位打卡功能，用的是百度地图，目前公司想做一套基于小程序的app
问题：定位以及地图展示是基于微信的，由于微信与百度地图采用的是不同的坐标体系，所以需要坐标转换
方案：目前为了兼容老项目，统一将坐标转换成百度坐标

```javascript
// 使用字符串定义高精度常量，避免精度丢失
var PI = "3.14159265358979324";
// 3000.0 / 180.0 = 16.666666666666668
var x_PI = (Number(PI) * 3000.0 / 180.0).toString();
var a = "6378245.0";
var ee = "0.00669342162296594323";

function toNumber(strNum: string) {
  return Number(strNum);
}

function outOfChina(lng: number, lat: number) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

function transformLat(x: number, y: number) {
  x = Number(x);
  y = Number(y);
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));

  ret += (20.0 * Math.sin(6.0 * x * toNumber(PI)) + 20.0 * Math.sin(2.0 * x * toNumber(PI))) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * toNumber(PI)) + 40.0 * Math.sin(y / 3.0 * toNumber(PI))) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * toNumber(PI)) + 320 * Math.sin(y * toNumber(PI) / 30.0)) * 2.0 / 3.0;

  // 保留更多小数位
  return parseFloat(ret.toFixed(10));
}

function transformLng(x, y) {
  x = Number(x);
  y = Number(y);
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));

  ret += (20.0 * Math.sin(6.0 * x * toNumber(PI)) + 20.0 * Math.sin(2.0 * x * toNumber(PI))) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * toNumber(PI)) + 40.0 * Math.sin(x / 3.0 * toNumber(PI))) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * toNumber(PI)) + 300.0 * Math.sin(x / 30.0 * toNumber(PI))) * 2.0 / 3.0;

  // 保留更多小数位
  return parseFloat(ret.toFixed(10));
}

function wgs84ToGcj02(lng: number, lat: number) {
  lng = Number(lng);
  lat = Number(lat);

  if (outOfChina(lng, lat)) {
    return [lng, lat];
  }

  var dlat = transformLat(lng - 105.0, lat - 35.0);
  var dlng = transformLng(lng - 105.0, lat - 35.0);
  var radlat = lat / 180.0 * toNumber(PI);
  var magic = Math.sin(radlat);
  magic = 1 - toNumber(ee) * magic * magic;
  var sqrtmagic = Math.sqrt(magic);

  dlat = (dlat * 180.0) / ((toNumber(a) * (1 - toNumber(ee))) / (magic * sqrtmagic) * toNumber(PI));
  dlng = (dlng * 180.0) / (toNumber(a) / sqrtmagic * Math.cos(radlat) * toNumber(PI));

  var mglat = lat + dlat;
  var mglng = lng + dlng;

  // 保留小数点后6位
  return [parseFloat(mglng.toFixed(6)), parseFloat(mglat.toFixed(6))];
}

function gcj02ToBd09(lng: number, lat: number) {
  lng = Number(lng);
  lat = Number(lat);

  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * toNumber(x_PI));
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * toNumber(x_PI));
  var bdLng = z * Math.cos(theta) + 0.0065;
  var bdLat = z * Math.sin(theta) + 0.006;

  // 保留小数点后6位
  return [parseFloat(bdLng.toFixed(6)), parseFloat(bdLat.toFixed(6))];
}

function round(num: number) {
  // 保留小数点后6位
  return parseFloat(num.toFixed(6));
}

// 导出主函数
export const wgs84ToBd09 = function (lng: number, lat: number) {
  try {
    // 输入验证
    lng = Number(lng);
    lat = Number(lat);

    if (isNaN(lng) || isNaN(lat)) {
      throw new Error('Invalid coordinates');
    }

    // 确保输入是有效范围
    if (Math.abs(lng) > 180 || Math.abs(lat) > 90) {
      throw new Error('Coordinates out of range');
    }

    // 执行转换
    var gcj02 = wgs84ToGcj02(lng, lat);
    var bd09 = gcj02ToBd09(gcj02[0], gcj02[1]);

    // 返回结果前再次确保精度
    return [round(bd09[0]), round(bd09[1])];

  } catch (error) {
    console.error('Coordinate conversion error:', error);
    return [lng, lat]; // 发生错误时返回原始坐标
  }
};

// 调试用的辅助函数
export const wgs84ToGcj02a = function (lng: number, lat: number) {
  try {
    return wgs84ToGcj02(Number(lng), Number(lat));
  } catch (error) {
    console.error('WGS84 to GCJ02 conversion error:', error);
    return [lng, lat];
  }
};

export const gcj02ToBd09a = function (lng: number, lat: number) {
  try {
    return gcj02ToBd09(Number(lng), Number(lat));
  } catch (error) {
    console.error('GCJ02 to BD09 conversion error:', error);
    return [lng, lat];
  }
};

export function rad(d: number) {
  return d * Math.PI / 180.0;
}

interface Point {
  latitude: number
  longitude: number
}

// 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function getDistances(p1: Point, p2: Point) {
  const { latitude: lat1, longitude: lng1 } = p1, { latitude: lat2, longitude: lng2 } = p2;
  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);
  const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  const aa = s * 6378137; // EARTH_RADIUS;
  // 输出为米
  const distance = Math.round(aa * 10000) / 10000;

  return distance
}
```
