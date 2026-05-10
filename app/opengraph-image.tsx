import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ResumeAI — Instant AI Resume Review';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Left Side (60%) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            paddingLeft: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: '#6366f1',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '20px',
              fontWeight: 'bold',
              width: 'fit-content',
              marginBottom: '24px',
            }}
          >
            Powered by AI
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#111827',
              lineHeight: '1.1',
              marginBottom: '20px',
            }}
          >
            <span>Get Your Resume</span>
            <span>Reviewed in 30s</span>
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#6b7280',
              marginBottom: '40px',
            }}
          >
            ATS Score • Section Feedback • Keyword Analysis
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#6366f1',
              fontWeight: 'bold',
            }}
          >
            resume-ai-ten-gamma.vercel.app
          </div>
        </div>

        {/* Right Side (40%) */}
        <div
          style={{
            display: 'flex',
            width: '40%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Score Ring */}
            <svg
              width="300"
              height="300"
              viewBox="0 0 100 100"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#6366f1"
                strokeWidth="8"
                strokeDasharray="282.7"
                strokeDashoffset="36.7"
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '80px',
                  fontWeight: 'bold',
                  color: '#111827',
                }}
              >
                87
              </span>
              <span
                style={{
                  fontSize: '20px',
                  color: '#6b7280',
                  fontWeight: 'bold',
                  marginTop: '-10px',
                }}
              >
                Overall Score
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
