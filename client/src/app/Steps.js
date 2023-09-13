import React from 'react'

// 重力加速度のしきい値
var GRAVITY_MIN = 9.8;
var GRAVITY_MAX = 12.00;
// 歩数
var _step = 0;
// 現在歩いているかどうか
var _isStep = false;

function initialize() {
    // デバイスの加速度センサーの情報を取得します
    window.addEventListener('devicemotion', onDeviceMotion);
    console.log("initialize");
}

function onDeviceMotion(e) {
    e.preventDefault();
    // 重力加速度を取得
    var ag = e.accelerationIncludingGravity;
    // 重力加速度ベクトルの大きさを取得
    var acc = Math.sqrt(ag.x*ag.x + ag.y*ag.y + ag.z*ag.z);
    // 歩数をカウント
    if (_isStep) {
        // 歩行中にしきい値よりも低ければ一歩とみなす
        if (acc < GRAVITY_MIN) {
            _step++;
            _isStep = false;
        }
    } else {
        // しきい値よりも大きければ歩いているとみなす
        if (acc > GRAVITY_MAX) {
            _isStep = true;
        }
    }
    console.log(_step + "歩");
}

initialize();

const Acc = () => {
  return (
    <div>
      {_step + "歩"}
    </div>
  )
}

export default Acc
