import styled, { keyframes } from "styled-components";

export const StyledPlantDetailsPage = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }
  }
`;

export const StyledDetailsCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h2 {
    color: #333;
    font-size: 22px;
    margin-top: 0;
    margin-bottom: 25px;
    font-weight: 600;
    border-bottom: 2px solid #8fd28f;
    padding-bottom: 10px;
  }
`;

export const StyledDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  .detail-label {
    color: #555;
    font-weight: 500;
  }

  .detail-value {
    font-weight: 700;
    color: #333;
  }

  .with-arrow {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const StyledMetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledMetricBox = styled.div`
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    color: #333;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;

export const StyledCircularMetric = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.08);
  border: 3px solid #8fd28f;
  position: relative;

  .metric-value {
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
`;

export const StyledWaterTankVisual = styled.div`
  margin-top: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const StyledWaterTankContainer = styled.div`
  width: 100%;
  height: 40px;
  border: 2px solid #6cb66c;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  margin-bottom: 15px;
`;

const waterShine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

interface WaterLevelProps {
  $waterPercentage: number;
}

export const StyledWaterTankLevel = styled.div<WaterLevelProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.$waterPercentage}%;
  background: linear-gradient(90deg, #3498db 0%, #4da7db 50%, #3498db 100%);
  border-radius: 18px;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: ${waterShine} 2s infinite;
  }
`;

export const StyledWaterTankPercentage = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #3498db;
  text-align: center;
  margin-top: 10px;
`;

export const StyledTankLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  color: #666;
`;

// Specific button styles for PlantDetails page
export const StyledDeleteButton = styled.button`
  flex: 1;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ff7675 0%, #d63031 100%);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(214, 48, 49, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const StyledSaveButton = styled.button`
  flex: 1;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #8fd28f 0%, #6cb66c 100%);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 182, 108, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;