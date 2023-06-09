// ==UserScript==
// @name         MegaUp Bypass and Remove 5 Secs
// @namespace    https://github.com/pgh268400
// @version      1.0
// @description  liminates ad blocker blocking and 5 second waits on Megaup sites and generates download links instantly.
// @match        https://megaup.net/*
// @grant        none
// @author       File
// ==/UserScript==

(function () {
  "use strict";

  //5초후 렌더링이 동작할 수 없게 seconds를 조작한다.
  seconds = -1;

  //함수 호출부를 이용해 다운로드 링크 바로 생성
  //정규식을 활용해 DeObfuscate_String_and_Create_Form_With_Mhoa_URL() 함수의 인자값들을 DOM에서 각각 파싱한다.
  function get_arg() {
    var scriptElements = document.getElementsByTagName("script"); // 현재 HTML 문서의 모든 <script> 요소 가져오기
    var regex =
      /DeObfuscate_String_and_Create_Form_With_Mhoa_URL\('([^']*)', '([^']*)', '([^']*)', '([^']*)'\)/; // 정규식 패턴 생성

    for (var i = 0; i < scriptElements.length; i++) {
      var scriptText = scriptElements[i].innerHTML; // 각 <script> 요소의 내용 가져오기
      var match = regex.exec(scriptText); // 정규식 매칭

      if (match) {
        var d1 = match[1]; // 첫 번째 인자 값
        var d2 = match[2]; // 두 번째 인자 값
        var FileName = match[3]; // 세 번째 인자 값
        var FileSize = match[4]; // 네 번째 인자 값
        return [d1, d2, FileName, FileSize];
      }
    }
  }
  
  //인자값을 기반으로 url_da_encrypt 를 생성하는 함수.
  function get_url_da_encrypt(d1, d2) {
    var url_da_encrypt = "";
    for (let i = d1.length / 4 - 1; i >= 0; i--) {
      url_da_encrypt += d1[i];
    }
    for (let i = (d1.length / 4) * 3 - 1; i >= (d1.length / 4) * 2; i--) {
      url_da_encrypt += d1[i];
    }
    for (let i = (d2.length - 3) / 2 + 2; i >= 3; i--) {
      url_da_encrypt += d2[i];
    }
    return url_da_encrypt;
  }
  
  //최종적으로 다운로드 링크를 생성한다. 필요조건은 FileName, FileSize, 그리고 d1 d2 를 이용해 생성한 url_da_encrypt
  const args = get_arg();
  const d1 = args[0];
  const d2 = args[1];
  const FileName = args[2];
  const FileSize = args[3];
  const url_da_encrypt = get_url_da_encrypt(d1, d2);

  $(".download-timer").html(
    "<form action='https://download.megaup.net/' method='get' style='text-align: center;'><input id='idurl' type='hidden' name='idurl'><input id='idfilename' type='hidden' name='idfilename'><input id='idfilesize' type='hidden' name='idfilesize'><input id='btnsubmit' type='submit' class='btn btn-default' value='Create Download Link'></form>"
  );
  document.getElementById("idurl").setAttribute("value", url_da_encrypt);
  document.getElementById("idfilename").setAttribute("value", FileName);
  document.getElementById("idfilesize").setAttribute("value", FileSize);
})();
