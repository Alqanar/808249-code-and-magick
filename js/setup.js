'use strict';

var templateWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsWall = document.querySelector('.setup-similar-list');

var OPTIONS_WIZARD = {
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  surnames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)]'
  ],

  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

document.querySelector('.setup').classList.remove('hidden');

function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getWizard(data) {
  return {
    name: data.names[getRandomInteger(0, data.names.length - 1)] + ' ' + data.surnames[getRandomInteger(0, data.surnames.length - 1)],
    coatColor: data.coatColors[getRandomInteger(0, data.coatColors.length - 1)],
    eyesColor: data.eyesColors[getRandomInteger(0, data.eyesColors.length - 1)]
  };
}

function generateWizard(dataWizard) {
  var clonedWizard = templateWizard.cloneNode(true);

  clonedWizard.querySelector('.setup-similar-label').textContent = dataWizard.name;
  clonedWizard.querySelector('.wizard-coat').setAttribute('fill', dataWizard.coatColor);
  clonedWizard.querySelector('.wizard-eyes').setAttribute('fill', dataWizard.eyesColor);

  return clonedWizard;
}

function getSimilarWizards() {
  var similarWizards = [];

  for (var i = 0; i < 4; i++) {
    similarWizards.push(getWizard(OPTIONS_WIZARD));
  }

  return similarWizards;
}

var wizardsList = getSimilarWizards();

function paintWizards(list) {
  var wizardFragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    wizardFragment.appendChild(generateWizard(list[i]));
  }

  return wizardsWall.appendChild(wizardFragment);
}

paintWizards(wizardsList);

document.querySelector('.setup-similar').classList.remove('hidden');
