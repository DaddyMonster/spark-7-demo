import { QueryOptions } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { addApolloState } from './add-pollo-state';
import { initializeApollo } from './use-apollo';

export const createServerSideProps = async (
  docs: QueryOptions[]
): Promise<GetServerSideProps> => {
  const apolloClient = initializeApollo();
  await Promise.all(docs.map(async (x) => await apolloClient.query(x)));
  return addApolloState(apolloClient, {
    props: {},
  });
};
