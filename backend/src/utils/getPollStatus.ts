type PollWithVotes = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;

  pollOptions: {
    _count: {
      votes: number;
    };
  }[];
};

export function getPollStatus(data: PollWithVotes) {
  const now = new Date();
  const totalVotes = data.pollOptions.reduce((acc, option) => {
    return acc + option._count.votes;
  }, 0);

  if (data.startDate > now) {
    return "Não iniciada.";
  }

  if (data.endDate < now) {
    return "Finalizada.";
  }

  if (totalVotes > 0) {
    return "Em andamento.";
  }

  return "Iniciada.";
}
