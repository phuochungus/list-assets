import {View, Text} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

export default function ItemScreen({navigation, route}) {
  const {info, rest} = route.params;
  console.log(info);
  return (
    <View style={{alignItems: 'center', flex: 1, padding: 30}}>
      <ImageLoad
        loadingStyle={{size: 'large', color: 'blue'}}
        source={{
          uri:
            info.image_url ||
            'https://testnets.opensea.io/static/images/placeholder.png',
        }}
        style={{width: 250, height: 250}}
      />
      <View
        style={{
          marginTop: 30,
          alignItems: 'center',
          backgroundColor: 'lavenderblush',
          width: 250,
        }}>
        <Text style={{color: 'black'}}>{info.name || 'No name'}</Text>
      </View>
      <View>
        <Text style={{color: 'black'}}>
          {info.description || 'no descripton'}
        </Text>
      </View>
    </View>
  );
}
