import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState, Component} from 'react';
import ImageLoad from 'react-native-image-placeholder';

class CustomItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.navigation);
    return (
      <View style={{margin: 20, padding: 20, backgroundColor: 'aqua'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('Item', {info: this.props.info});
          }}>
          <ImageLoad
            loadingStyle={{size: 'large', color: 'blue'}}
            source={{
              uri:
                this.props.info.image_url ||
                'https://testnets.opensea.io/static/images/placeholder.png',
            }}
            style={{width: 250, height: 250}}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'ivory',
              width: 250,
            }}>
            <Text style={{color: 'black'}}>
              {this.props.info.name || 'No name'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default function HomeScreen({navigation}) {
  const [listItem, setListItem] = useState([]);

  fetchAPI = async () => {
    try {
      let response = await fetch(
        'https://testnets-api.opensea.io/api/v1/assets',
        {
          method: 'GET',
        },
      );

      response = await response.json();
      setListItem(response.assets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{marginTop: 20, width: 100, height: 100, alignSelf: 'center'}}>
        <Button title="Load" onPress={async () => await fetchAPI()} />
      </View>
      {listItem.length != 0 ? (
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={listItem}
            renderItem={({item}) => (
              <CustomItem info={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}></FlatList>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
