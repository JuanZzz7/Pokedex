export default function CharacterCard({ name, classType, level, hp, isAlive }) {
    const isCritical = isAlive && hp < 20;
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '10px 0',
                maxWidth: '300px',
                opacity: isAlive ? 1 : 0.5,
            }}
        >
            { }
            <h3>{name}</h3>
            <p>Clase: {classType} | Nivel: {level}</p>
            <p>puntos de vida: {hp}</p>

            { }
            <div>
                Estado: {isAlive ? 'En combate' : 'Caído'}
            </div>

            { }
            {isCritical && (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    ¡Salud Crítica!
                </span>
            )}
        </div>
    );
}

import { useState } from 'react';

export default function CharacterCard({ name, classType, initialHp = 100 }) {
    // 1. Convertimos la vida en un estado propio de la tarjeta
    const [hp, setHp] = useState(initialHp);

    // 2. Derivamos estados lógicos a partir del estado base
    const isAlive = hp > 0;
    const isCritical = isAlive && hp <= 25;

    // 3. Funciones manejadoras de eventos (Handlers)
    function handleTakeDamage() {
        // Math.max evita que baje de 0
        setHp((prevHp) => Math.max(0, prevHp - 15));
    }

    function handleHeal() {
        if (!isAlive) return; // Si ya cayó, no puede curarse solo
        setHp((prevHp) => Math.min(100, prevHp + 15));
    }

    function handleRevive() {
        setHp(50);
    }

    return (
        <div
            style={{
                border: isCritical ? '2px solid red' : '1px solid #ccc',
                borderRadius: '12px',
                padding: '18px',
                margin: '12px 0',
                maxWidth: '320px',
                backgroundColor: isAlive ? '#ffffff' : '#f5f5f5',
                opacity: isAlive ? 1 : 0.6,
                boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
            }}
        >
            <h3 style={{ margin: '0 0 8px 0' }}>{name}</h3>
            <p style={{ margin: '4px 0', color: '#555' }}>Clase: {classType}</p>

            <p style={{ margin: '8px 0', fontWeight: 'bold' }}>
                HP: {hp} / 100
            </p>

            {/* Indicadores condicionales */}
            <div style={{ marginBottom: '12px' }}>
                <span
                    style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        backgroundColor: isAlive ? '#e8f5e9' : '#ffebee',
                        color: isAlive ? '#2e7d32' : '#c62828',
                    }}
                >
                    {isAlive ? '🟢 En combate' : '💀 Derrotado'}
                </span>

                {isCritical && (
                    <span style={{ marginLeft: '8px', color: '#d32f2f', fontSize: '12px', fontWeight: 'bold' }}>
                        ⚠️ ¡Peligro!
                    </span>
                )}
            </div>

            {/* Botonera de acciones con eventos onClick */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                    onClick={handleTakeDamage}
                    disabled={!isAlive}
                    style={{ cursor: isAlive ? 'pointer' : 'not-allowed' }}
                >
                    ⚔️ Atacar (-15)
                </button>

                <button
                    onClick={handleHeal}
                    disabled={!isAlive || hp >= 100}
                    style={{ cursor: isAlive && hp < 100 ? 'pointer' : 'not-allowed' }}
                >
                    🧪 Curar (+15)
                </button>

                {!isAlive && (
                    <button onClick={handleRevive} style={{ cursor: 'pointer', backgroundColor: '#e0f2fe' }}>
                        ✨ Revivir (50 HP)
                    </button>
                )}
            </div>
        </div>
    );
}
