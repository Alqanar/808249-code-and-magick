'use strict';

var CLOUD_X = 120;
var CLOUD_Y = 120;
var CLOUD_GAP = 10;

var CONG_X = 100;
var CONG_Y = 60;
var RES_X = 90;
var RES_Y = 170;
var TEXT_GAP = 30;

var BAR_X = 180;
var BAR_Y = 70;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_TEXT_Y = BAR_Y + BAR_MAX_HEIGHT + BAR_GAP / 2;

function renderCloud(ctx, x, y, color, colorStroke) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(0.5, 0.5);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-180, 80, -160, 280, 240, 280);
  ctx.bezierCurveTo(320, 400, 600, 400, 680, 280);
  ctx.bezierCurveTo(1000, 280, 1000, 160, 880, 80);
  ctx.bezierCurveTo(1080, -200, 800, -220, 680, -120);
  ctx.bezierCurveTo(600, -300, 320, -240, 320, -120);
  ctx.bezierCurveTo(220, -340, -260, -240, 0, 60);
  ctx.strokeStyle = colorStroke;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMaxTimes(arr) {
  var maxValue = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  return maxValue;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      '#3ea4c4',
      '#878787'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#add8e6',
      '#d3d3d3'
  );

  var maxTime = getMaxTimes(times);
  var barHeight;

  ctx.font = '16px PT Mono';

  ctx.fillText('Ура!', CONG_X, CONG_Y);
  ctx.fillText('Вы победили!', CONG_X, CONG_Y + TEXT_GAP);
  ctx.fillText('Список', RES_X, RES_Y);
  ctx.fillText('результатов:', RES_X, RES_Y + TEXT_GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgb(0, 0, 0)';

    barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    ctx.fillText(
        names[i],
        BAR_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP),
        BAR_TEXT_Y
    );

    ctx.fillText(
        Math.floor(times[i]),
        BAR_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP),
        BAR_Y + (BAR_MAX_HEIGHT - barHeight) - BAR_GAP / 4
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomNumber(15, 100) + '%, 50%)';
    }

    ctx.fillRect(
        BAR_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP),
        BAR_Y + (BAR_MAX_HEIGHT - barHeight),
        BAR_WIDTH,
        barHeight
    );
  }
};
