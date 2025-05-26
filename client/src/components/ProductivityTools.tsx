import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PomodoroSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

const Timer = styled.div`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: #2c3e50;
  margin: 1rem 0;
`;

const TimerControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &.start {
    background: #2ecc71;
    color: white;
    &:hover {
      background: #27ae60;
    }
  }

  &.pause {
    background: #f1c40f;
    color: white;
    &:hover {
      background: #f39c12;
    }
  }

  &.reset {
    background: #e74c3c;
    color: white;
    &:hover {
      background: #c0392b;
    }
  }
`;

const ProgressSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: #3498db;
  transition: width 0.3s ease;
`;

const GoalTracker = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const GoalText = styled.p`
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0.5rem 0;
`;

const GoalProgress = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3498db;
`;

const TimerSettings = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fff;
  border-radius: 6px;
`;

const TimerInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
`;

const TimerLabel = styled.label`
  color: #666;
  font-size: 0.9rem;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
  }
`;

interface ProductivityToolsProps {
  totalTodos: number;
  completedTodos: number;
  dailyGoal: number;
}

const ProductivityTools: React.FC<ProductivityToolsProps> = ({
  totalTodos,
  completedTodos,
  dailyGoal
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        setTimeLeft(customMinutes * 60); // Use custom minutes
        setIsBreak(false);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, customMinutes]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(customMinutes * 60);
    setIsBreak(false);
  };

  const handleSaveCustomTime = () => {
    if (customMinutes > 0 && customMinutes <= 60) {
      setTimeLeft(customMinutes * 60);
      setIsEditing(false);
    }
  };

  const progressPercentage = (completedTodos / totalTodos) * 100 || 0;
  const goalProgress = Math.min(completedTodos, dailyGoal);
  const goalPercentage = (goalProgress / dailyGoal) * 100;

  return (
    <Container>
      <ToolsGrid>
        <PomodoroSection>
          <h2>Pomodoro Timer</h2>
          {isEditing ? (
            <TimerSettings>
              <TimerLabel>
                Duration (minutes):
                <TimerInput
                  type="number"
                  min="1"
                  max="60"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Number(e.target.value))}
                />
              </TimerLabel>
              <SaveButton onClick={handleSaveCustomTime}>Save</SaveButton>
            </TimerSettings>
          ) : (
            <TimerSettings>
              <TimerLabel>Current Duration: {customMinutes} minutes</TimerLabel>
              <SaveButton onClick={() => setIsEditing(true)}>Edit</SaveButton>
            </TimerSettings>
          )}
          <Timer>{formatTime(timeLeft)}</Timer>
          <TimerControls>
            {!isRunning ? (
              <Button className="start" onClick={handleStart}>
                Start
              </Button>
            ) : (
              <Button className="pause" onClick={handlePause}>
                Pause
              </Button>
            )}
            <Button className="reset" onClick={handleReset}>
              Reset
            </Button>
          </TimerControls>
          <p>{isBreak ? 'Break Time!' : 'Focus Time'}</p>
        </PomodoroSection>

        <ProgressSection>
          <h2>Today's Progress</h2>
          <ProgressBar>
            <ProgressFill percentage={progressPercentage} />
          </ProgressBar>
          <p>{Math.round(progressPercentage)}% Complete</p>
          
          <GoalTracker>
            <h3>Daily Goal</h3>
            <GoalText>Complete {dailyGoal} tasks today</GoalText>
            <GoalProgress>
              {goalProgress} / {dailyGoal}
            </GoalProgress>
            <ProgressBar>
              <ProgressFill percentage={goalPercentage} />
            </ProgressBar>
          </GoalTracker>
        </ProgressSection>
      </ToolsGrid>
    </Container>
  );
};

export default ProductivityTools; 