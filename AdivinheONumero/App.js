import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const MAX_TENTATIVAS = 3;

  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumero());
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  function gerarNumero() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const verificarPalpite = () => {
    const numero = parseInt(palpite);
    if (isNaN(numero)) {
      setMensagem('⚠️ Digite um número válido!');
      return;
    }

    Keyboard.dismiss();
    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (numero === numeroSecreto) {
      setMensagem(`🎉 JACKPOT! Você acertou ${numeroSecreto}!`);
      setJogoFinalizado(true);
    } else if (novasTentativas >= MAX_TENTATIVAS) {
      setMensagem(`💥 Game Over! O número era ${numeroSecreto}.`);
      setJogoFinalizado(true);
    } else if (numero < numeroSecreto) {
      setMensagem('📈 Mais alto!');
    } else {
      setMensagem('📉 Mais baixo!');
    }

    setPalpite('');
  };

  const reiniciarJogo = () => {
    setNumeroSecreto(gerarNumero());
    setPalpite('');
    setMensagem('');
    setTentativas(0);
    setJogoFinalizado(false);
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" duration={1000} style={styles.titulo}>
        🎰 Vegas Guess
      </Animatable.Text>

      <Text style={styles.subtitulo}>Descubra o número entre 1 e 100</Text>
      <Text style={styles.tentativas}>
        Tentativas restantes: {MAX_TENTATIVAS - tentativas}
      </Text>

      <Animatable.View animation="zoomIn" duration={800} delay={200}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="🎲 Digite seu número"
          placeholderTextColor="#ccc"
          value={palpite}
          onChangeText={setPalpite}
          editable={!jogoFinalizado}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1000} delay={300} style={styles.botoes}>
        <Pressable
          style={[styles.botao, jogoFinalizado && styles.botaoDesativado]}
          onPress={verificarPalpite}
          disabled={jogoFinalizado}
        >
          <Text style={styles.botaoTexto}>🎯 Jogar</Text>
        </Pressable>

        <Pressable style={styles.botaoReiniciar} onPress={reiniciarJogo}>
          <Text style={styles.botaoTexto}>🔄 Reiniciar</Text>
        </Pressable>
      </Animatable.View>

      <Animatable.Text
        animation="fadeIn"
        duration={800}
        style={styles.resultado}
        key={mensagem} // força animação a cada nova mensagem
      >
        {mensagem}
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 10,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitulo: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  tentativas: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    color: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 12,
    padding: 14,
    width: screenWidth * 0.8,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#DAA520',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  botaoReiniciar: {
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#FF5555',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  botaoDesativado: {
    backgroundColor: '#555',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  resultado: {
    marginTop: 30,
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    lineHeight: 28,
  },
});
