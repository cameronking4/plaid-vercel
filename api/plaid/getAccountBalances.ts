import { NowRequest, NowResponse } from '@vercel/node';
import plaid from 'plaid';

const plaidClient = new plaid.Client(
  process.env.PLAID_CLIENT_ID ?? '',
  process.env.PLAID_SECRET ?? '',
  process.env.PLAID_PUBLIC_KEY ?? '',
  plaid.environments[process.env.PLAID_ENVIRONMENT ?? 'sandbox']
);

export default async (req: NowRequest, res: NowResponse) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'AccessToken is required' });
  }

  try {
    const response = await plaidClient.getBalance(accessToken);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
