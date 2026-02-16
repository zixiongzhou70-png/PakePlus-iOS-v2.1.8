window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>你的AI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f5f5f5; font-family: system-ui, -apple-system; height: 100vh; display: flex; justify-content: center; align-items: center; }
        .app { width: 100%; max-width: 500px; height: 90vh; background: white; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; }
        .header { background: #4a6fa5; color: white; padding: 20px; text-align: center; font-size: 20px; font-weight: 500; }
        .messages { flex: 1; padding: 20px; overflow-y: auto; background: #fafafa; display: flex; flex-direction: column; }
        .user-msg { align-self: flex-end; background: #4a6fa5; color: white; padding: 10px 15px; border-radius: 20px 20px 5px 20px; max-width: 80%; margin-bottom: 10px; }
        .ai-msg { align-self: flex-start; background: #e9e9e9; color: #333; padding: 10px 15px; border-radius: 20px 20px 20px 5px; max-width: 80%; margin-bottom: 10px; }
        .input-area { padding: 15px; border-top: 1px solid #ddd; display: flex; gap: 10px; background: white; }
        input { flex: 1; padding: 12px 15px; border: 1px solid #ddd; border-radius: 25px; outline: none; font-size: 16px; }
        button { padding: 12px 25px; background: #4a6fa5; color: white; border: none; border-radius: 25px; font-size: 16px; cursor: pointer; }
        .loading { color: #999; text-align: center; padding: 10px; }
    </style>
</head>
<body>
<div class="app">
    <div class="header">你的AI</div>
    <div class="messages" id="messages"></div>
    <div class="input-area">
        <input type="text" id="input" placeholder="说点什么..." onkeypress="if(event.key==='Enter') send()">
        <button onclick="send()">发送</button>
    </div>
</div>

<script>
    const API_KEY = "sk-fdbf962224b94bbcbc1cd2f91c92a88c";

    async function send() {
        const input = document.getElementById('input');
        const msg = input.value.trim();
        if (!msg) return;
        
        addMessage(msg, 'user');
        input.value = '';
        
        const loading = addLoading();
        
        try {
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_KEY
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: msg }]
                })
            });
            
            const data = await response.json();
            removeLoading(loading);
            addMessage(data.choices[0].message.content, 'ai');
        } catch (e) {
            removeLoading(loading);
            addMessage('请求失败，请重试', 'ai');
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'user-msg' : 'ai-msg';
        msgDiv.textContent = text;
        document.getElementById('messages').appendChild(msgDiv);
        scrollToBottom();
    }

    function addLoading() {
        const div = document.createElement('div');
        div.className = 'ai-msg loading';
        div.id = 'loading';
        div.textContent = '正在思考...';
        document.getElementById('messages').appendChild(div);
        scrollToBottom();
        return div;
    }

    function removeLoading(div) { if(div) div.remove(); }

    function scrollToBottom() {
        const m = document.getElementById('messages');
        m.scrollTop = m.scrollHeight;
    }
</script>
</body>
</html>