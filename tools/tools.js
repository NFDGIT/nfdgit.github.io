(function () {
  // JSON Formatter
  var jsonInput = document.getElementById('json-input');
  var jsonOutput = document.getElementById('json-output');
  var jsonBtn = document.getElementById('json-format-btn');
  if (jsonBtn) {
    jsonBtn.addEventListener('click', function () {
      try {
        var parsed = JSON.parse(jsonInput.value);
        jsonOutput.textContent = JSON.stringify(parsed, null, 2);
        jsonOutput.classList.remove('is-error');
      } catch (e) {
        jsonOutput.textContent = 'JSON 语法错误: ' + e.message;
        jsonOutput.classList.add('is-error');
      }
    });
  }

  // Color Converter
  var colorInput = document.getElementById('color-input');
  var colorResult = document.getElementById('color-result');
  var colorPreview = document.getElementById('color-preview');
  var colorBtn = document.getElementById('color-convert-btn');

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  if (colorBtn) {
    colorBtn.addEventListener('click', function () {
      var val = colorInput.value.trim();
      var rgb, hex, hsl;
      var rgbMatch = val.match(/^rgb[a]?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      var hslMatch = val.match(/^hsl[a]?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i);

      if (val.match(/^#?[0-9a-fA-F]{3,8}$/)) {
        rgb = hexToRgb(val);
        hex = '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      } else if (rgbMatch) {
        rgb = { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
        hex = '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      } else if (hslMatch) {
        var h = +hslMatch[1], s = +hslMatch[2], l = +hslMatch[3];
        hsl = { h: h, s: s, l: l };
        hex = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        colorResult.textContent = 'HSL: hsl(' + h + ', ' + s + '%, ' + l + '%)';
        colorPreview.style.background = hex;
        return;
      } else {
        colorResult.textContent = '无法识别的颜色格式，请输入 HEX、RGB 或 HSL';
        colorPreview.style.background = 'transparent';
        return;
      }
      colorResult.textContent = 'HEX: ' + hex + '\nRGB: rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')\nHSL: hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
      colorPreview.style.background = hex;
    });
  }

  // QR Code Generator
  var qrInput = document.getElementById('qr-input');
  var qrOutput = document.getElementById('qr-output');
  var qrBtn = document.getElementById('qr-generate-btn');
  if (qrBtn) {
    qrBtn.addEventListener('click', function () {
      var text = qrInput.value.trim();
      if (!text) return;
      qrOutput.innerHTML = '';
      if (typeof QRCode === 'undefined') {
        qrOutput.textContent = '二维码库加载失败，功能暂不可用';
        return;
      }
      new QRCode(qrOutput, { text: text, width: 200, height: 200 });
    });
  }
})();
