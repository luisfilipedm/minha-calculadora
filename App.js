import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Button, Text, MD3LightTheme } from 'react-native-paper';

// Mapeamento de números para Hieróglifos (0 a 9)
const hieroMap = {
  '0': '0', 
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '.': '.'
};

// Função para converter uma string de números para hieróglifos
const toHiero = (str) => {
  if (!str) return '';
  return str.toString().split('').map(char => hieroMap[char] || char).join('');
};

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  // Lida com o toque nos números
  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Lida com o toque nos operadores (+, -, *, /)
  const handleOperatorInput = (op) => {
    setOperator(op);
    setPreviousValue(displayValue);
    setDisplayValue('0');
  };

  // Limpa a calculadora (C)
  const clear = () => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
  };

  // Calcula o resultado final (=)
  const calculateResult = () => {
    if (!operator || !previousValue) return;

    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
    }

    setDisplayValue(String(result));
    setOperator(null);
    setPreviousValue(null);
  };

  return (
    <PaperProvider theme={MD3LightTheme}>
      <View style={styles.container}>
        
        {/* Display da Calculadora */}
        <View style={styles.displayContainer}>
          <Text variant="displayLarge" style={styles.displayText}>
            {toHiero(displayValue)}
          </Text>
        </View>

        {/* Teclado */}
        <View style={styles.keypad}>
          <View style={styles.row}>
            <Button mode="contained-tonal" onPress={clear} style={styles.button}>C</Button>
            <Button mode="contained-tonal" onPress={() => handleOperatorInput('/')} style={styles.button}>/</Button>
          </View>
          
          <View style={styles.row}>
            <Button mode="elevated" onPress={() => handleNumberInput('7')} style={styles.button}>{toHiero('7')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('8')} style={styles.button}>{toHiero('8')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('9')} style={styles.button}>{toHiero('9')}</Button>
            <Button mode="contained-tonal" onPress={() => handleOperatorInput('*')} style={styles.button}>*</Button>
          </View>

          <View style={styles.row}>
            <Button mode="elevated" onPress={() => handleNumberInput('4')} style={styles.button}>{toHiero('4')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('5')} style={styles.button}>{toHiero('5')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('6')} style={styles.button}>{toHiero('6')}</Button>
            <Button mode="contained-tonal" onPress={() => handleOperatorInput('-')} style={styles.button}>-</Button>
          </View>

          <View style={styles.row}>
            <Button mode="elevated" onPress={() => handleNumberInput('1')} style={styles.button}>{toHiero('1')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('2')} style={styles.button}>{toHiero('2')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('3')} style={styles.button}>{toHiero('3')}</Button>
            <Button mode="contained-tonal" onPress={() => handleOperatorInput('+')} style={styles.button}>+</Button>
          </View>

          <View style={styles.row}>
            <Button mode="elevated" onPress={() => handleNumberInput('0')} style={[styles.button, styles.zeroButton]}>{toHiero('0')}</Button>
            <Button mode="elevated" onPress={() => handleNumberInput('.')} style={styles.button}>.</Button>
            <Button mode="contained" onPress={calculateResult} style={styles.button}>=</Button>
          </View>
        </View>

      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#e0e0e0',
  },
  displayText: {
    fontSize: 64,
    color: '#333',
  },
  keypad: {
    padding: 10,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  zeroButton: {
    flex: 2, // O botão zero ocupa o espaço de duas colunas
  }
});