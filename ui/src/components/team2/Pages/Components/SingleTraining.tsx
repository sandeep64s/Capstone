import '../styles/Trainings.css';

type trainingProps = {
    training: {
        trainerId: number,
        trainingId: string,
        stack: string,
        startDate: Date,
        endDate: Date,
        traineeCount: number
    }
}

const SingleTraining = (props: trainingProps) => {
    const { training } = props;
    const { startDate, endDate } = training;
    return (
        <a className="training-link" href={`/trainings/${training.trainingId}`}>
            <div className="training-container single-training">
                <div className="trainer-id">{training.trainerId}</div>
                <div className="training-id">{training.trainingId}</div>
                <div className="stack">{training.stack}</div>
                <div className="sdate">{`${startDate.getDate() + 1}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`}</div>
                <div className="edate">{`${endDate.getDate() + 1}-${endDate.getMonth() + 1}-${endDate.getFullYear()}`}</div>
                <div className="count">{training.traineeCount}</div>
            </div>
        </a>
    )
};

export default SingleTraining;