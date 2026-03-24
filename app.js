// ============================================================
// 金流診断アプリ app.js
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // 設問データ（10問×4択・順方向 A=3, B=2, C=1, D=0）
  // ----------------------------------------------------------
  var questions = [
    {
      id: 1,
      axis: '①出口管理',
      text: '月の収支を把握していますか？',
      choices: [
        '毎月きちんと記録している',
        'だいたい把握している',
        'あまり把握していない',
        '全く把握していない'
      ]
    },
    {
      id: 2,
      axis: '①出口管理',
      text: '衝動買いの頻度は？',
      choices: [
        'ほとんどしない',
        'たまにする',
        '月に数回する',
        'よくする'
      ]
    },
    {
      id: 3,
      axis: '②環境',
      text: '玄関・財布・デスク周りの状態は？',
      choices: [
        'いつも整頓されている',
        'おおむね整っている',
        '散らかりがち',
        'かなり散らかっている'
      ]
    },
    {
      id: 4,
      axis: '②環境',
      text: '不要品の処分頻度は？',
      choices: [
        '定期的に見直している',
        '気づいたら処分する',
        'なかなか手放せない',
        'ほとんど処分しない'
      ]
    },
    {
      id: 5,
      axis: '③言語習慣',
      text: '"お金がない"を日常的に使いますか？',
      choices: [
        '全く使わない',
        'ほとんど使わない',
        'ときどき使う',
        'よく使う'
      ]
    },
    {
      id: 6,
      axis: '③言語習慣',
      text: 'お金の話題への心理的抵抗は？',
      choices: [
        '抵抗なく話せる',
        '少し抵抗がある',
        'かなり抵抗がある',
        'できれば避けたい'
      ]
    },
    {
      id: 7,
      axis: '④決断速度',
      text: 'お金に関する判断を先延ばしにしがちですか？',
      choices: [
        'すぐに判断する',
        '数日で決める',
        '後回しにしがち',
        'いつも先延ばし'
      ]
    },
    {
      id: 8,
      axis: '④決断速度',
      text: '必要な出費への即断力は？',
      choices: [
        '必要と判断したらすぐ出す',
        '少し悩むが出す',
        'かなり迷って時間がかかる',
        '出し渋ることが多い'
      ]
    },
    {
      id: 9,
      axis: '⑤方向性',
      text: '人にお金を使うことに抵抗がありますか？',
      choices: [
        '喜んで使える',
        '場面による',
        'やや抵抗がある',
        '強い抵抗がある'
      ]
    },
    {
      id: 10,
      axis: '⑤方向性',
      text: 'お金を受け取ることへの罪悪感は？',
      choices: [
        '全くない',
        'ほとんどない',
        'やや感じる',
        '強く感じる'
      ]
    }
  ];

  // ----------------------------------------------------------
  // タイプ別データ
  // ----------------------------------------------------------
  var typeData = {
    stagnation: {
      displayName: '金流停滞タイプ',
      color: '#4a0e4e',
      icon: '\u{1F3D4}\uFE0F',
      catchphrase: 'お金の流れが止まっている状態',
      description:
        '収支の把握や生活環境の整備が追いついておらず、お金のエネルギーが滞っています。まずは「見える化」と「整理」から始めることで、流れを取り戻すきっかけが生まれます。',
      hint:
        'まずは1ヶ月間、毎日の支出を記録してみましょう。金額の大小ではなく「流れを意識する」ことが停滞を解消する第一歩です。',
      tendency:
        '基盤（収支管理・環境）にも課題があり、流れが滞りやすい傾向があります。'
    },
    leakage: {
      displayName: '金流漏出タイプ',
      color: '#1a3a5c',
      icon: '\u{1F30A}',
      catchphrase: 'お金が気づかないうちに流れ出ている状態',
      description:
        '言葉の習慣やお金への心理的ブロック、決断の先延ばしによって、無意識にお金のエネルギーが漏れ出ています。「言葉」と「決断」を変えることで、漏れを防ぐことができます。',
      hint:
        '今日から「お金がない」を「お金は巡ってくる」に言い換えてみましょう。言葉の習慣を変えることが、金流改善の最も取り組みやすいアクションです。',
      tendency:
        '言葉の習慣や決断の遅れから、無意識にエネルギーが漏れやすい傾向もあります。'
    },
    blockage: {
      displayName: '金流遮断タイプ',
      color: '#5c1a1a',
      icon: '\u{1F6AA}',
      catchphrase: 'お金の受け取りにブレーキがかかっている状態',
      description:
        'お金を使うことや受け取ることへの心理的抵抗が強く、豊かさの循環が遮断されています。「受け取る」ことに許可を出すマインドセットの転換が鍵です。',
      hint:
        '次に誰かにご馳走されたり、報酬を受け取る場面があったら、「ありがとうございます」とだけ言って素直に受け取ってみましょう。',
      tendency:
        'お金の受け取りに対する心理的ブレーキも見られます。'
    },
    awakening: {
      displayName: '金流覚醒タイプ',
      color: '#d4a843',
      icon: '\u2728',
      catchphrase: 'お金のエネルギーが健全に循環している状態',
      description:
        '収支管理・環境整備・言語習慣・決断力・受容力のすべてがバランスよく整っています。さらなる高みを目指すには、この状態を維持しながら「与える」ことを意識的に増やしていきましょう。',
      hint:
        'あなたの金流は良好な状態です。次のステップとして、周囲の人の金流改善を手伝ってみましょう。豊かさを分かち合うことで、さらに大きな循環が生まれます。',
      tendency: ''
    },
    mixed: {
      displayName: '金流総合改善タイプ',
      color: '#8a8a8a',
      icon: '\u{1F52E}',
      catchphrase: '全体的にお金の流れを見直す時期',
      description:
        '複数の軸にまたがって改善ポイントがあり、特定の弱点というよりも全体的な底上げが必要な状態です。焦らず、一つずつ取り組んでいきましょう。',
      hint:
        'すべてを一度に変えようとせず、まずは「環境を整える」ことから始めましょう。物理的な整理が、心とお金の流れを同時に整えてくれます。',
      tendency: ''
    }
  };

  var lineKeywordMap = {
    stagnation: '停滞',
    leakage: '漏出',
    blockage: '遮断',
    awakening: '覚醒',
    mixed: '総合'
  };

  // ----------------------------------------------------------
  // 状態管理
  // ----------------------------------------------------------
  var currentQuestion = 0;
  var answers = []; // answers[0..9] = 選択した点数(3,2,1,0)

  // ----------------------------------------------------------
  // 1. 画面遷移制御
  // ----------------------------------------------------------
  function showScreen(screenId) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    var target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }
  }

  // ----------------------------------------------------------
  // 2. 質問表示
  // ----------------------------------------------------------
  function showQuestion(index) {
    currentQuestion = index;
    var q = questions[index];

    // 質問番号
    var qNum = document.getElementById('question-number');
    if (qNum) qNum.textContent = 'Q' + q.id + ' / 10';

    // 設問テキスト
    var qText = document.getElementById('question-text');
    if (qText) qText.textContent = q.text;

    // プログレスバー
    var progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      progressFill.style.width = ((index / questions.length) * 100) + '%';
    }

    // 選択肢
    var choicesContainer = document.getElementById('choices');
    if (choicesContainer) {
      while (choicesContainer.firstChild) {
          choicesContainer.removeChild(choicesContainer.firstChild);
        }
      for (var i = 0; i < q.choices.length; i++) {
        (function (choiceIndex) {
          var btn = document.createElement('button');
          btn.className = 'choice-btn';
          btn.textContent = q.choices[choiceIndex];
          btn.addEventListener('click', function () {
            selectAnswer(choiceIndex);
          });
          choicesContainer.appendChild(btn);
        })(i);
      }
    }

    // フェードインアニメーション
    var questionScreen = document.getElementById('screen-question');
    if (questionScreen) {
      questionScreen.classList.remove('fade-in');
      // Force reflow to restart animation
      void questionScreen.offsetWidth;
      questionScreen.classList.add('fade-in');
    }
  }

  // ----------------------------------------------------------
  // 選択肢クリック処理
  // ----------------------------------------------------------
  function selectAnswer(choiceIndex) {
    // 順方向: A=3, B=2, C=1, D=0
    var score = 3 - choiceIndex;
    answers[currentQuestion] = score;

    if (currentQuestion < questions.length - 1) {
      showQuestion(currentQuestion + 1);
    } else {
      // 全問回答完了 → 結果計算
      var result = diagnose(answers);
      showScreen('screen-result');
      showResult(result);
    }
  }

  // ----------------------------------------------------------
  // 3. 診断ロジック
  // ----------------------------------------------------------
  function diagnose(ans) {
    // 5軸スコア (各0-6)
    var axis1 = ans[0] + ans[1]; // ①出口管理
    var axis2 = ans[2] + ans[3]; // ②環境
    var axis3 = ans[4] + ans[5]; // ③言語習慣
    var axis4 = ans[6] + ans[7]; // ④決断速度
    var axis5 = ans[8] + ans[9]; // ⑤方向性

    // 群スコア (各0-12)
    var groupA = axis1 + axis2;          // 基盤
    var groupB = axis3 + axis4;          // 循環
    var groupC = axis5 * 2;              // 受容

    var scores = { axis1: axis1, axis2: axis2, axis3: axis3, axis4: axis4, axis5: axis5 };
    var groups = { A: groupA, B: groupB, C: groupC };

    // 判定フロー
    var primaryType, secondaryType, isMixed, lineKeyword;

    // 1. 全群 >= 8 → 覚醒型
    if (groupA >= 8 && groupB >= 8 && groupC >= 8) {
      return {
        primaryType: 'awakening',
        secondaryType: null,
        isMixed: false,
        scores: scores,
        groups: groups,
        lineKeyword: '覚醒'
      };
    }

    // 2. 最低群を特定（同点時: A > B > C の優先順位）
    var minVal = Math.min(groupA, groupB, groupC);

    // 最低群の決定（優先: A > B > C）
    var lowestGroup;
    if (groupA === minVal) {
      lowestGroup = 'A';
    } else if (groupB === minVal) {
      lowestGroup = 'B';
    } else {
      lowestGroup = 'C';
    }

    // primaryType決定
    var groupToType = { A: 'stagnation', B: 'leakage', C: 'blockage' };
    primaryType = groupToType[lowestGroup];

    // 4. 副タイプ判定
    // 最低群以外で、最低群との差が1点以内の群を数える
    var otherGroups = ['A', 'B', 'C'].filter(function (g) { return g !== lowestGroup; });
    var closeGroups = otherGroups.filter(function (g) {
      return groups[g] - minVal <= 1;
    });

    if (closeGroups.length === 2) {
      // 全3群が1点以内 → 混在型
      isMixed = true;
      secondaryType = null;
      lineKeyword = '総合';
      // isMixed時のprimaryTypeはstagnation（仕様表の*印）
      primaryType = 'stagnation';
    } else if (closeGroups.length === 1) {
      // 副タイプ1つ
      isMixed = false;
      secondaryType = groupToType[closeGroups[0]];
      lineKeyword = lineKeywordMap[primaryType];
    } else {
      // 差が2点以上 → 単一型
      isMixed = false;
      secondaryType = null;
      lineKeyword = lineKeywordMap[primaryType];
    }

    return {
      primaryType: primaryType,
      secondaryType: secondaryType,
      isMixed: isMixed,
      scores: scores,
      groups: groups,
      lineKeyword: lineKeyword
    };
  }

  // テスト用エクスポート
  window._diagnoseForTest = diagnose;

  // ----------------------------------------------------------
  // 4. 結果表示
  // ----------------------------------------------------------
  function showResult(result) {
    var dataKey = result.isMixed ? 'mixed' : result.primaryType;
    var data = typeData[dataKey];

    // 結果カードのクラス設定
    var resultCard = document.getElementById('result-card');
    if (resultCard) {
      // クラスリセット
      resultCard.className = 'result-card';
      var typeClass = result.isMixed ? 'type-mixed' : 'type-' + result.primaryType;
      resultCard.classList.add(typeClass);
      resultCard.style.borderColor = data.color;
    }

    // アイコン
    var iconEl = document.getElementById('result-icon');
    if (iconEl) iconEl.textContent = data.icon;

    // タイプ名
    var typeNameEl = document.getElementById('result-type-name');
    if (typeNameEl) {
      var displayText = data.displayName;
      if (!result.isMixed && result.secondaryType) {
        var secondaryData = typeData[result.secondaryType];
        // 「○○タイプ（△△傾向あり）」形式
        displayText = data.displayName + '（' + lineKeywordMap[result.secondaryType] + '傾向あり）';
      }
      typeNameEl.textContent = displayText;
      typeNameEl.style.color = data.color;
    }

    // キャッチコピー
    var catchEl = document.getElementById('result-catchphrase');
    if (catchEl) catchEl.textContent = data.catchphrase;

    // 説明
    var descEl = document.getElementById('result-description');
    if (descEl) descEl.textContent = data.description;

    // 副タイプ説明
    var secondaryEl = document.getElementById('result-secondary');
    var secondaryTextEl = document.getElementById('result-secondary-text');
    if (secondaryEl) {
      if (!result.isMixed && result.secondaryType) {
        if (secondaryTextEl) secondaryTextEl.textContent = typeData[result.secondaryType].tendency;
        secondaryEl.style.display = 'block';
      } else {
        secondaryEl.style.display = 'none';
      }
    }

    // 改善ヒント
    var hintEl = document.getElementById('improvement-hint');
    if (hintEl) hintEl.textContent = data.hint;

    // レーダーチャート
    drawRadarChart(result.scores);

    // LINE CTA
    setupLineCTA(result);

    // SNSシェアボタン
    setupShareButtons(result);
  }

  // ----------------------------------------------------------
  // 5. レーダーチャート（Canvas）
  // ----------------------------------------------------------
  function drawRadarChart(scores) {
    var canvas = document.getElementById('radar');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var cx = w / 2;
    var cy = h / 2;
    var maxVal = 6;
    var radius = Math.min(cx, cy) - 40;

    ctx.clearRect(0, 0, w, h);

    var labels = ['①出口管理', '②環境', '③言語習慣', '④決断速度', '⑤方向性'];
    var values = [scores.axis1, scores.axis2, scores.axis3, scores.axis4, scores.axis5];
    var numAxes = 5;
    var angleStep = (2 * Math.PI) / numAxes;
    var startAngle = -Math.PI / 2; // 上から開始

    // 背景グリッド線
    ctx.strokeStyle = 'rgba(196, 181, 217, 0.25)';
    ctx.lineWidth = 1;
    for (var level = 1; level <= maxVal; level++) {
      var r = (level / maxVal) * radius;
      ctx.beginPath();
      for (var i = 0; i <= numAxes; i++) {
        var angle = startAngle + angleStep * (i % numAxes);
        var x = cx + r * Math.cos(angle);
        var y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 軸線
    ctx.strokeStyle = 'rgba(196, 181, 217, 0.3)';
    for (var i = 0; i < numAxes; i++) {
      var angle = startAngle + angleStep * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.stroke();
    }

    // データ描画（ゴールド塗りつぶし）
    ctx.beginPath();
    for (var i = 0; i < numAxes; i++) {
      var angle = startAngle + angleStep * i;
      var r = (values[i] / maxVal) * radius;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(212, 168, 67, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#d4a843';
    ctx.lineWidth = 2;
    ctx.stroke();

    // データ点
    for (var i = 0; i < numAxes; i++) {
      var angle = startAngle + angleStep * i;
      var r = (values[i] / maxVal) * radius;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#d4a843';
      ctx.fill();
    }

    // 軸ラベル
    ctx.fillStyle = '#c4b5d9';
    ctx.font = "13px 'Noto Sans JP', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < numAxes; i++) {
      var angle = startAngle + angleStep * i;
      var labelRadius = radius + 28;
      var lx = cx + labelRadius * Math.cos(angle);
      var ly = cy + labelRadius * Math.sin(angle);
      ctx.fillText(labels[i], lx, ly);
    }
  }

  // ----------------------------------------------------------
  // 6. LINE CTA
  // ----------------------------------------------------------
  function setupLineCTA(result) {
    var lineBtn = document.getElementById('line-cta-button');
    if (lineBtn) {
      lineBtn.href = '#line-placeholder';
    }

    var keywordEl = document.getElementById('line-keyword');
    if (keywordEl) {
      keywordEl.textContent = '【' + result.lineKeyword + '】';
    }

    var noteEl = document.getElementById('line-secondary-note');
    if (noteEl) {
      if (!result.isMixed && result.secondaryType) {
        var secondaryName = lineKeywordMap[result.secondaryType];
        noteEl.textContent = '※あなたには' + secondaryName + 'の傾向もあります。詳しくはLINEでお届けします';
        noteEl.style.display = 'block';
      } else {
        noteEl.style.display = 'none';
      }
    }
  }

  // ----------------------------------------------------------
  // 7. SNSシェアボタン
  // ----------------------------------------------------------
  // シェア用の最新結果を保持
  var latestResult = null;

  function setupShareButtons(result) {
    latestResult = result;
  }

  // シェアボタンのリスナーはinit()で一度だけ登録
  function initShareButtons() {
    var twitterBtn = document.querySelector('.share-btn.twitter');
    if (twitterBtn) {
      twitterBtn.onclick = function (e) {
        e.preventDefault();
        if (!latestResult) return;
        var dataKey = latestResult.isMixed ? 'mixed' : latestResult.primaryType;
        var data = typeData[dataKey];
        var pageUrl = window.location.href;
        var shareText = '金流診断で【' + data.displayName + '】でした！あなたのお金の流れタイプは？';
        var url = 'https://twitter.com/intent/tweet?text=' +
          encodeURIComponent(shareText) + '&url=' + encodeURIComponent(pageUrl);
        window.open(url, '_blank');
      };
    }

    var lineShareBtn = document.querySelector('.share-btn.line-share');
    if (lineShareBtn) {
      lineShareBtn.onclick = function (e) {
        e.preventDefault();
        if (!latestResult) return;
        var pageUrl = window.location.href;
        var url = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(pageUrl);
        window.open(url, '_blank');
      };
    }

    var copyBtn = document.querySelector('.share-btn.copy');
    if (copyBtn) {
      copyBtn.onclick = function (e) {
        e.preventDefault();
        var pageUrl = window.location.href;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(pageUrl).then(function () {
            showCopyNotification();
          });
        } else {
          var textarea = document.createElement('textarea');
          textarea.value = pageUrl;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showCopyNotification();
        }
      };
    }
  }

  function showCopyNotification() {
    var notification = document.createElement('div');
    notification.textContent = 'コピーしました！';
    notification.style.cssText =
      'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
      'background:#333;color:#fff;padding:10px 24px;border-radius:8px;' +
      'font-size:14px;z-index:9999;opacity:1;transition:opacity 0.5s;';
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.style.opacity = '0';
      setTimeout(function () {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 1500);
  }

  // ----------------------------------------------------------
  // 初期化
  // ----------------------------------------------------------
  function init() {
    // 「診断を始める」ボタン
    var startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        answers = [];
        currentQuestion = 0;
        showScreen('screen-question');
        showQuestion(0);
      });
    }

    // 「もう一度診断する」ボタン
    var retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', function () {
        answers = [];
        currentQuestion = 0;
        showScreen('screen-start');
        window.scrollTo(0, 0);
      });
    }

    // シェアボタンのリスナー登録（一度だけ）
    initShareButtons();

    // 初期画面表示
    showScreen('screen-start');
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
