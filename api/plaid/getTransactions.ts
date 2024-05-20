import { NowRequest, NowResponse } from '@vercel/node';
import plaid from 'plaid';

const plaidClient = new plaid.Client(
  process.env.PLAID_CLIENT_ID ?? '',
  process.env.PLAID_SECRET ?? '',
  process.env.PLAID_PUBLIC_KEY ?? '',
  plaid.environments[process.env.PLAID_ENVIRONMENT ?? 'sandbox']
);

export default async (req: NowRequest, res: NowResponse) => {
  const { accessToken, startDate, endDate } = req.query;

  try {
    const response = await plaidClient.getTransactions(accessToken as string, startDate as string, endDate as string);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
