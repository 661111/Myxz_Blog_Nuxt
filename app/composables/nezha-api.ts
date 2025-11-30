// nezha.ws.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface NezhaWSOptions {
  url: string;
  reconnectInterval?: number;
  heartbeatInterval?: number;
}

export class NezhaWebSocket {
  private ws: WebSocket | null = null;
  private reconnectTimer: any = null;
  private heartbeatTimer: any = null;
  public messages = ref<any[]>([]);
  public isConnected = ref(false);
  public error = ref<string | null>(null);

  constructor(private options: NezhaWSOptions) {}

  connect() {
    this.ws = new WebSocket(this.options.url);
    
    this.ws.onopen = () => {
      this.isConnected.value = true;
      this.error.value = null;
      console.log('WebSocket connected');
      
      // 发送认证信息（根据实际需求调整）
      this.sendAuth();
      
      // 启动心跳检测
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messages.value.push(data);
        console.log('Received:', data);
      } catch (e) {
        console.error('Invalid JSON:', event.data);
      }
    };

    this.ws.onerror = (error) => {
      this.handleError(error);
    };

    this.ws.onclose = (event) => {
      this.handleClose(event);
    };
  }

  private sendAuth() {
    // 实现具体认证逻辑（如API Token）
    const authData = { 
      type: 'auth',
      token: 'your_api_token_here'
    };
    this.sendMessage(authData);
  }

  private sendMessage(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not ready:', data);
    }
  }

  private startHeartbeat() {
    if (this.options.heartbeatInterval) {
      this.heartbeatTimer = setInterval(() => {
        this.sendMessage({ type: 'ping' });
      }, this.options.heartbeatInterval);
    }
  }

  private handleClose(event: CloseEvent) {
    this.isConnected.value = false;
    console.log('WebSocket closed:', event.code, event.reason);
    
    // 自动重连机制
    this.reconnect();
  }

  private handleError(error: Event) {
    this.error.value = error.message;
    console.error('WebSocket error:', error);
    
    // 触发重连
    this.reconnect();
  }

  private reconnect() {
    clearInterval(this.heartbeatTimer);
    
    if (this.reconnectTimer) return;
    
    this.reconnectTimer = setTimeout(() => {
      console.log('Attempting to reconnect...');
      this.connect();
      this.reconnectTimer = null;
    }, this.options.reconnectInterval || 5000);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    clearInterval(this.heartbeatTimer);
    clearTimeout(this.reconnectTimer);
  }
}

// Vue组件示例
export default {
  setup() {
    const wsOptions = {
      url: 'wss://qio.ng/api/v1/ws/server',
      reconnectInterval: 10000,
      heartbeatInterval: 30000
    };
    
    const nezhaWS = new NezhaWebSocket(wsOptions);
    
    onMounted(() => {
      nezhaWS.connect();
    });

    onBeforeUnmount(() => {
      nezhaWS.disconnect();
    });

    return {
      messages: nezhaWS.messages,
      isConnected: nezhaWS.isConnected,
      error: nezhaWS.error
    };
  }
}