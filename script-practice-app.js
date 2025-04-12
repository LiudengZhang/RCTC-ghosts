// 剧本练习应用 - 单文件版本

// 剧本数据
const scriptData = {
  title: "群鬼",
  characters: ["吕嘉纳", "安格斯川", "曼德", "阿尔文太太", "欧士华"],
  scenes: [
    {
      id: 1,
      title: "第一幕",
      lines: [
        { type: "direction", text: "【客厅，窗外下着大雨】" },
        { type: "character", character: "曼德", text: "（合着双手）明天叫我在大会上怎么说话呢！" },
        { type: "character", character: "阿尔文太太", text: "喔，你好歹总会对付过去的。" },
        { type: "character", character: "曼德", text: "（低声，为的是不让饭厅里的人听见）不错，咱们千万别让人家起疑心。" },
        { type: "character", character: "阿尔文太太", text: "（低声，可是口气很坚决）是的。从此以后这出演了多少年的丑戏就可以结束了。从后天起，我过日子就只当没我丈夫这个人，只当他从来没在这所房子里住过。从今以后，除了我的孩子和他的母亲家里再没有第三个人了！" },
        { type: "direction", text: "【饭厅里传来一把椅子倒下来的声音，同时听见吕嘉纳低声用力说："欧士华！别闹！你疯了？快撒手！"】" },
        { type: "character", character: "阿尔文太太", text: "（吓得跳起来）啊——" },
        { type: "character", character: "吕嘉纳", text: "（走进来）别紧张，夫人。欧士华只是有点情绪激动。" },
        { type: "character", character: "安格斯川", text: "（冷静地）这种事在这种情况下很常见。" },
        { type: "character", character: "欧士华", text: "（走进来，脸色苍白）母亲，我想我该休息一下。" }
      ]
    },
    {
      id: 2,
      title: "第二幕",
      lines: [
        { type: "direction", text: "【次日早晨，同一客厅】" },
        { type: "character", character: "阿尔文太太", text: "欧士华，你今天感觉好些了吗？" },
        { type: "character", character: "欧士华", text: "（勉强一笑）好多了，母亲。" },
        { type: "character", character: "安格斯川", text: "（走进来）早安，夫人。早安，欧士华。" },
        { type: "character", character: "阿尔文太太", text: "安格斯川先生，能请你帮我个忙吗？" },
        { type: "character", character: "安格斯川", text: "当然，夫人，请说。" },
        { type: "character", character: "吕嘉纳", text: "（突然出现）打扰了，我想和欧士华谈谈。" },
        { type: "character", character: "曼德", text: "（低声对阿尔文太太）我们必须小心行事。" }
      ]
    }
  ]
};

// 这里是代码的关键部分，它支持直接在CodePen或JSFiddle运行
// 首先添加基本样式
document.head.innerHTML += `
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
  }
  
  h1, h2, h3 {
    color: #333;
  }
  
  .btn {
    background-color: #4a3f9f;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    font-size: 14px;
  }
  
  .btn:hover {
    background-color: #5f4bb6;
  }
  
  .btn-selected {
    background-color: #7b68ee;
  }
  
  .character-selection, .scene-selection {
    margin: 20px 0;
  }
  
  .script-line {
    padding: 10px;
    margin: 10px 0;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
  
  .character-name {
    font-weight: bold;
    color: #4a3f9f;
    margin-bottom: 5px;
  }
  
  .direction {
    font-style: italic;
    color: #666;
  }
  
  .hidden-text {
    color: #f9f9f9;
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
  }
  
  .script-uploader {
    margin: 20px 0;
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
  }
  
  .practice-container {
    margin-top: 20px;
  }
  
  .file-input {
    margin: 10px 0;
  }
  
  .format-guide {
    padding: 10px;
    background-color: #eef;
    border-radius: 4px;
    margin: 10px 0;
    display: none;
  }
  
  pre {
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
  }
</style>
`;

// 创建页面结构
document.body.innerHTML = `
<div class="container">
  <h1>剧本练习应用</h1>
  
  <div id="home-page">
    <div id="custom-script-alert" style="display: none;">
      <div style="background-color: #e0f2fe; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
        <p>当前使用自定义剧本: <strong id="custom-script-title"></strong></p>
      </div>
      <button class="btn" id="reset-btn">切换回默认剧本</button>
    </div>
    
    <div class="script-uploader">
      <h3>导入自己的剧本</h3>
      <p>选择文本文件上传，每个角色的台词应该格式为"角色名 台词内容"，场景提示应该用【】括起来</p>
      
      <button class="btn" id="format-toggle-btn">查看剧本格式说明</button>
      
      <div class="format-guide" id="format-guide">
        <h3>剧本格式说明</h3>
        
        <p>为了让系统正确解析您的剧本，请按照以下格式组织文本：</p>
        
        <pre>
第一幕

【场景描述放在中括号里】

角色A 这是角色A的台词

角色B 这是角色B的台词

【另一个场景描述】

第二幕

角色C 新场景中的台词</pre>
        
        <h4>主要规则：</h4>
        <ol>
          <li>每个角色的台词前必须有角色名，后面跟一个空格，然后是台词内容</li>
          <li>场景描述和舞台指示放在【】中</li>
          <li>使用"第X幕"来分隔不同场景</li>
          <li>每句台词或场景描述单独一行</li>
        </ol>
      </div>
      
      <input type="file" accept=".txt" id="script-file" class="file-input">
      <p id="upload-error" class="error-message" style="display: none;"></p>
    </div>
    
    <h2>选择你要扮演的角色</h2>
    <div class="character-selection" id="character-selection"></div>
    
    <div id="scene-selection-container" style="display: none;">
      <h2>选择练习场景</h2>
      <div class="scene-selection" id="scene-selection"></div>
    </div>
    
    <button class="btn" id="start-btn" style="display: none;">开始练习</button>
  </div>
  
  <div id="practice-page" style="display: none;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <h2 id="scene-title"></h2>
      <button class="btn" id="back-btn">返回选择</button>
    </div>
    
    <h3 id="role-display"></h3>
    <p style="color: #666; font-style: italic;">点击你的台词可以显示或隐藏内容</p>
    
    <div id="script-content"></div>
  </div>
</div>
`;

// 应用逻辑
(function() {
  // 状态管理
  let currentData = scriptData;
  let selectedCharacter = '';
  let selectedSceneId = null;
  let isCustomScript = false;
  let revealedLines = [];
  
  // 元素引用
  const homePage = document.getElementById('home-page');
  const practicePage = document.getElementById('practice-page');
  const characterSelection = document.getElementById('character-selection');
  const sceneSelectionContainer = document.getElementById('scene-selection-container');
  const sceneSelection = document.getElementById('scene-selection');
  const startBtn = document.getElementById('start-btn');
  const sceneTitle = document.getElementById('scene-title');
  const roleDisplay = document.getElementById('role-display');
  const scriptContent = document.getElementById('script-content');
  const backBtn = document.getElementById('back-btn');
  const resetBtn = document.getElementById('reset-btn');
  const customScriptAlert = document.getElementById('custom-script-alert');
  const customScriptTitle = document.getElementById('custom-script-title');
  const formatToggleBtn = document.getElementById('format-toggle-btn');
  const formatGuide = document.getElementById('format-guide');
  const scriptFileInput = document.getElementById('script-file');
  const uploadError = document.getElementById('upload-error');
  
  // 初始化函数
  function init() {
    renderCharacters();
    setupEventListeners();
  }
  
  // 渲染角色选择
  function renderCharacters() {
    characterSelection.innerHTML = '';
    currentData.characters.forEach(character => {
      const btn = document.createElement('button');
      btn.className = `btn ${selectedCharacter === character ? 'btn-selected' : ''}`;
      btn.textContent = character;
      btn.onclick = () => handleCharacterSelect(character);
      characterSelection.appendChild(btn);
    });
  }
  
  // 渲染场景选择
  function renderScenes() {
    sceneSelection.innerHTML = '';
    currentData.scenes.forEach(scene => {
      const btn = document.createElement('button');
      btn.className = `btn ${selectedSceneId === scene.id ? 'btn-selected' : ''}`;
      btn.textContent = scene.title;
      btn.onclick = () => handleSceneSelect(scene.id);
      sceneSelection.appendChild(btn);
    });
  }
  
  // 渲染剧本内容
  function renderScript() {
    const scene = currentData.scenes.find(s => s.id === selectedSceneId);
    if (!scene) return;
    
    sceneTitle.textContent = scene.title;
    roleDisplay.textContent = `你正在扮演: ${selectedCharacter}`;
    scriptContent.innerHTML = '';
    
    scene.lines.forEach((line, index) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = `script-line ${line.type === 'direction' ? 'direction' : ''}`;
      
      if (line.type === 'direction') {
        // 场景提示
        lineDiv.textContent = line.text;
      } else if (line.type === 'character') {
        // 角色台词
        const nameDiv = document.createElement('div');
        nameDiv.className = 'character-name';
        nameDiv.textContent = line.character;
        lineDiv.appendChild(nameDiv);
        
        const textDiv = document.createElement('div');
        if (line.character === selectedCharacter) {
          // 用户角色的台词隐藏
          textDiv.className = revealedLines.includes(index) ? '' : 'hidden-text';
          textDiv.textContent = line.text;
          textDiv.onclick = () => toggleRevealLine(index);
        } else {
          // 其他角色的台词显示
          textDiv.textContent = line.text;
        }
        lineDiv.appendChild(textDiv);
      }
      
      scriptContent.appendChild(lineDiv);
    });
  }
  
  // 事件处理函数
  function handleCharacterSelect(character) {
    selectedCharacter = character;
    selectedSceneId = null;
    renderCharacters();
    sceneSelectionContainer.style.display = 'block';
    renderScenes();
    startBtn.style.display = 'none';
  }
  
  function handleSceneSelect(sceneId) {
    selectedSceneId = sceneId;
    renderScenes();
    startBtn.style.display = 'block';
  }
  
  function handleStartPractice() {
    if (selectedCharacter && selectedSceneId) {
      homePage.style.display = 'none';
      practicePage.style.display = 'block';
      revealedLines = [];
      renderScript();
    }
  }
  
  function toggleRevealLine(index) {
    if (revealedLines.includes(index)) {
      revealedLines = revealedLines.filter(i => i !== index);
    } else {
      revealedLines.push(index);
    }
    renderScript();
  }
  
  function handleBackToHome() {
    homePage.style.display = 'block';
    practicePage.style.display = 'none';
  }
  
  function handleResetToDefault() {
    currentData = scriptData;
    selectedCharacter = '';
    selectedSceneId = null;
    isCustomScript = false;
    customScriptAlert.style.display = 'none';
    renderCharacters();
    sceneSelectionContainer.style.display = 'none';
    startBtn.style.display = 'none';
  }
  
  function toggleFormatGuide() {
    formatGuide.style.display = formatGuide.style.display === 'none' ? 'block' : 'none';
    formatToggleBtn.textContent = formatGuide.style.display === 'none' ? '查看剧本格式说明' : '隐藏剧本格式说明';
  }
  
  function parseScriptText(text) {
    try {
      const lines = text.split('\n');
      const characters = new Set();
      const processedLines = [];
      let currentScene = { id: 1, title: '第一幕', lines: [] };
      const scenes = [currentScene];

      lines.forEach(line => {
        line = line.trim();
        if (!line) return; // Skip empty lines

        // Check if it's a scene direction (wrapped in 【】)
        if (line.startsWith('【') && line.endsWith('】')) {
          processedLines.push({ type: 'direction', text: line });
          currentScene.lines.push({ type: 'direction', text: line });
          return;
        }

        // Check if it's a character speaking
        const characterMatch = line.match(/^(.+?)(\s|\u3000)(.+)$/);
        if (characterMatch) {
          const character = characterMatch[1].trim();
          const text = characterMatch[3].trim();
          
          characters.add(character);
          processedLines.push({ type: 'character', character, text });
          currentScene.lines.push({ type: 'character', character, text });
        } else if (line.startsWith('第') && line.includes('幕')) {
          // If it's a new scene
          currentScene = { 
            id: scenes.length + 1, 
            title: line, 
            lines: [] 
          };
          scenes.push(currentScene);
        }
      });

      if (characters.size === 0) {
        showUploadError('未能识别到角色台词，请检查格式是否正确');
        return null;
      }

      return {
        title: '导入的剧本',
        characters: Array.from(characters),
        scenes
      };
    } catch (err) {
      console.error("Error parsing script:", err);
      showUploadError('解析剧本时出错，请确保格式正确');
      return null;
    }
  }
  
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      const parsedScript = parseScriptText(text);
      
      if (parsedScript) {
        currentData = parsedScript;
        selectedCharacter = '';
        selectedSceneId = null;
        isCustomScript = true;
        customScriptAlert.style.display = 'block';
        customScriptTitle.textContent = parsedScript.title;
        hideUploadError();
        renderCharacters();
        sceneSelectionContainer.style.display = 'none';
        startBtn.style.display = 'none';
      }
    };
    
    reader.onerror = () => {
      showUploadError('读取文件时出错');
    };
    
    reader.readAsText(file);
  }
  
  function showUploadError(message) {
    uploadError.textContent = message;
    uploadError.style.display = 'block';
  }
  
  function hideUploadError() {
    uploadError.style.display = 'none';
  }
  
  // 设置事件监听器
  function setupEventListeners() {
    startBtn.addEventListener('click', handleStartPractice);
    backBtn.addEventListener('click', handleBackToHome);
    resetBtn.addEventListener('click', handleResetToDefault);
    formatToggleBtn.addEventListener('click', toggleFormatGuide);
    scriptFileInput.addEventListener('change', handleFileUpload);
  }
  
  // 启动应用
  init();
})(); 