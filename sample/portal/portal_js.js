// 保存されたレイアウト情報（実際の環境ではlocalStorageを使用）
let savedLayout = {
  leftWidth: 70,
  rightWidth: 30,
};

// リサイズ機能
let isResizing = false;
const resizer = document.getElementById("resizer");
const leftPanel = document.getElementById("leftPanel");
const rightPanel = document.getElementById("rightPanel");
const container = document.querySelector(".portal-container");

// 初期化時にレイアウトを復元
function loadLayout() {
  leftPanel.style.width = savedLayout.leftWidth + "%";
  rightPanel.style.width = savedLayout.rightWidth + "%";
}

// レイアウトを保存
function saveLayout() {
  const leftWidth = parseFloat(leftPanel.style.width);
  const rightWidth = parseFloat(rightPanel.style.width);
  savedLayout = {
    leftWidth: leftWidth,
    rightWidth: rightWidth,
  };
}

// リサイザーのイベントリスナー
resizer.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  e.preventDefault();
});

function handleMouseMove(e) {
  if (!isResizing) return;

  const containerRect = container.getBoundingClientRect();
  const mouseX = e.clientX - containerRect.left;
  const leftWidth = (mouseX / containerRect.width) * 100;
  const rightWidth = 100 - leftWidth;

  // 最小値と最大値を制限
  if (leftWidth >= 20 && leftWidth <= 80) {
    leftPanel.style.width = leftWidth + "%";
    rightPanel.style.width = rightWidth + "%";
  }
}

function handleMouseUp() {
  if (isResizing) {
    isResizing = false;
    saveLayout();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
}

// グラフの作成
function createChart(canvasId, title, type) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  // サンプルデータ
  const data = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [],
  };

  if (type === "mixed") {
    // 線と棒の複合グラフ
    data.datasets = [
      {
        type: "bar",
        label: "売上",
        data: [120, 190, 300, 500, 200, 300],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "目標",
        data: [100, 200, 250, 400, 250, 350],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ];
  }

  const chart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            boxWidth: 12,
            padding: 10,
            font: {
              size: 10,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 10,
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
      layout: {
        padding: {
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        },
      },
    },
  });
}

// ボタン機能
function openListScreen() {
  const newTab = window.open("", "_blank");
  newTab.document.write(`
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <title>一覧表示</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>一覧表示</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>日付</th>
                    <th>状態</th>
                </tr>
                <tr>
                    <td>001</td>
                    <td>項目1</td>
                    <td>2024-01-01</td>
                    <td>完了</td>
                </tr>
                <tr>
                    <td>002</td>
                    <td>項目2</td>
                    <td>2024-01-02</td>
                    <td>処理中</td>
                </tr>
                <tr>
                    <td>003</td>
                    <td>項目3</td>
                    <td>2024-01-03</td>
                    <td>待機中</td>
                </tr>
            </table>
        </body>
        </html>
    `);
}

function openDetailScreen() {
  const newTab = window.open("", "_blank");
  newTab.document.write(`
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <title>詳細画面</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .detail-item { margin-bottom: 10px; }
                .label { font-weight: bold; display: inline-block; width: 100px; }
            </style>
        </head>
        <body>
            <h1>詳細画面</h1>
            <div class="detail-item">
                <span class="label">ID:</span> 001
            </div>
            <div class="detail-item">
                <span class="label">名前:</span> 項目1
            </div>
            <div class="detail-item">
                <span class="label">日付:</span> 2024-01-01
            </div>
            <div class="detail-item">
                <span class="label">状態:</span> 完了
            </div>
            <div class="detail-item">
                <span class="label">説明:</span> これは詳細情報です。
            </div>
        </body>
        </html>
    `);
}

// 初期化
document.addEventListener("DOMContentLoaded", function () {
  loadLayout();

  // グラフを作成
  createChart("chart1", "グラフ1", "mixed");
  createChart("chart2", "グラフ2", "mixed");
  createChart("chart3", "グラフ3", "mixed");
  createChart("chart4", "グラフ4", "mixed");
});
