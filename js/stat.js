'use strict';

var CLOUD_X = 130;
var CLOUD_Y = 130;
var CLOUD_GAP = 10;
var CLOUD_COLORS = {
  color: '#add8e6',
  colorStroke: '#d3d3d3'
};
var CLOUD_SHADOW_COLORS = {
  color: '#3ea4c4',
  colorStroke: '#878787'
};

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

function renderCloud(ctx, x, y, cloudShadowColor, cloudColor) {
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
  ctx.strokeStyle = cloudShadowColor.colorStroke;
  ctx.fillStyle = cloudShadowColor.color;
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  if (cloudColor) {
    renderCloud(
        ctx,
        x - CLOUD_GAP,
        y - CLOUD_GAP,
        cloudColor
    );
  }
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getMaxTime(arr) {
  var maxValue = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  return maxValue;
}

function renderBar(ctx, name, time, barPointX, barHeight) {
  ctx.fillText(
      name,
      barPointX,
      BAR_TEXT_Y
  );

  ctx.fillText(
      Math.floor(time),
      barPointX,
      BAR_Y + (BAR_MAX_HEIGHT - barHeight) - BAR_GAP / 4
  );

  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(240, ' + getRandomNumber(15, 100) + '%, 50%)';
  }

  ctx.fillRect(
      barPointX,
      BAR_Y + (BAR_MAX_HEIGHT - barHeight),
      BAR_WIDTH,
      barHeight
  );
}

window.renderStatistics = function (ctx, names, times) {

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_SHADOW_COLORS,
      CLOUD_COLORS
  );

  var maxTime = getMaxTime(times);
  var barHeight;
  var barPointX;

  ctx.font = '16px PT Mono';

  ctx.fillText('Ура!', CONG_X, CONG_Y);
  ctx.fillText('Вы победили!', CONG_X, CONG_Y + TEXT_GAP);
  ctx.fillText('Список', RES_X, RES_Y);
  ctx.fillText('результатов:', RES_X, RES_Y + TEXT_GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgb(0, 0, 0)';

    barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    barPointX = BAR_X + BAR_GAP + i * (BAR_WIDTH + BAR_GAP);

    renderBar(ctx, names[i], times[i], barPointX, barHeight);
  }
};
