import { QueryOptions } from '@apollo/client';
import { GetStaticProps } from 'next';
import { addApolloState } from './add-pollo-state';
import { initializeApollo } from './use-apollo';

export const createStaticProps = async (
  docs: QueryOptions[],
  revalidate = 30
): Promise<GetStaticProps> => {
  const apolloClient = initializeApollo();
  await Promise.all(docs.map(async (x) => await apolloClient.query(x)));
  return addApolloState(apolloClient, {
    props: {},
    revalidate,
  });
};
