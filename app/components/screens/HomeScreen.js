import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Home = () => {
  const { loading, error, data } = useQuery(
    gql`
      query($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(id: $id, search: $search) {
            id
            title {
              romaji
            }
          }
        }
      }
    `,
    {
      variables: {
        search: 'Fate/Zero',
        page: 1,
        perPage: 3,
      },
    },
  );
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error :(</Text>;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {data.Page.media.map((media) => (
            <View key={media.id}>
              <Text>{media.title.romaji}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
