import { StyleSheet } from 'react-native';

import { RootTabScreenProps } from '../types';

// Components
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import CommerceAvatar from '../components/CommerceAvatar';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <CommerceAvatar/>
      <Text style={styles.title}>Ventas</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
