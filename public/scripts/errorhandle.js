window.onerror = function (msg, url, line, col, error) {
  var extra = !col ? '' : '\ncolumn: ' + col;
  extra += !error ? '' : '\nerror: ' + error;
  // 全局捕获，避免白屏
  console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

  var suppressErrorAlert = true;

  return suppressErrorAlert;
};