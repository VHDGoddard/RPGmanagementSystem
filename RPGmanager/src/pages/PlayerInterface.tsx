// src/components/PlayerInterface.tsx
import { useState, useEffect } from 'react';
import './PlayerInterface.css';

// Definindo tipos
type InventoryItem = {
  id: number;
  name: string;
  description: string;
  icon: string;
};

type CharacterStatus = {
  health: number;
  vigor: number;
  energy: number;
  portrait: string;
};

const PlayerInterface: React.FC = () => {
  // Estados tipados
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Canhão Plasma', description: 'Carga: 98%', icon: '🔫' },
    { id: 2, name: 'Kit Médico', description: 'Usos restantes: 3', icon: '💊' },
  ]);
  const [statusEffects, setStatusEffects] = useState<string[]>([
    'Radiação (Nv.2)', 
    'Fadiga'
  ]);
  const [events, setEvents] = useState<string[]>([
    'SISTEMA: Conexão com a nave estabelecida',
    'MESTRE: Entidade desconhecida detectada no convés 5'
  ]);

  // Dados do personagem com tipo específico
  const characterStatus: CharacterStatus = {
    health: 100,
    vigor: 60,
    energy: 45,
    portrait: 'default'
  };

  // Funções com tipagem
  const sendMessage = (): void => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, newMessage]);
      setNewMessage('');
    }
  };

  const showTooltip = (item: InventoryItem): void => {
    // Implementar lógica do tooltip
    console.log('Mostrar tooltip:', item);
  };

  const hideTooltip = (): void => {
    // Implementar lógica do tooltip
    console.log('Esconder tooltip');
  };

  // Efeito com tipagem de retorno
  useEffect(() => {
    const scanInterval = setInterval(() => {
      // Simular atualizações periódicas do status
    }, 1000);

    return (): void => clearInterval(scanInterval);
  }, []);

  return (
    <div className="crt-screen">
      <div className="interface-container">
        {/* Seção Esquerda - Retrato e Status */}
        <div className="left-panel">
          <div className="character-portrait">
            <div 
              className="portrait-image"
              style={{ backgroundImage: `url(${characterStatus.portrait})` }}
            ></div>
            <div className="status-bars">
              <div className="status-bar">
                <span>SAÚDE</span>
                <div className="bar-container">
                  <div 
                    className="bar health" 
                    style={{ width: `${characterStatus.health}%` }}
                  ></div>
                </div>
              </div>
              {/* Repetir para Vigor e Energia */}
            </div>
          </div>
          
          <div className="status-effects">
            <h3>CONDIÇÕES DO TRAJE</h3>
            <div className="effects-grid">
              {statusEffects.map((effect, index) => (
                <div key={index} className="effect-chip">
                  {effect}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seção Direita - Comunicação e Eventos */}
        <div className="right-panel">
          <div className="communication-panel">
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className="chat-message">{msg}</div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setNewMessage(e.target.value)
                }
                onKeyPress={(e: React.KeyboardEvent) => 
                  e.key === 'Enter' && sendMessage()
                }
              />
              <button onClick={sendMessage}>ENVIAR</button>
            </div>
          </div>

          <div className="event-log">
            <h3>REGISTRO DE EVENTOS</h3>
            <div className="events-list">
              {events.map((event, index) => (
                <div key={index} className="event-entry">▶ {event}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Mochila - Itens */}
        <div className="inventory-panel">
          <h3>MOCHILA DE EQUIPAMENTOS</h3>
          <div className="inventory-grid">
            {inventory.map((item: InventoryItem) => (
              <div 
                key={item.id}
                className="inventory-item"
                onMouseEnter={() => showTooltip(item)}
                onMouseLeave={hideTooltip}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Efeitos Visuais */}
      <div className="scanline"></div>
      <div className="crt-glare"></div>
    </div>
  );
};

export default PlayerInterface;