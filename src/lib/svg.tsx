import { FC } from '@/model/commonModel'

type SvgIcon = {
  width?: string
  height?: string
  color?: string
  className?: string
}

export const Loader: FC<Omit<SvgIcon, 'color'>> = ({ width = '78px', height = '78px', className = undefined }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
    >
      <circle fill='#0a0528' stroke='none' cx='6' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 15 ; 0 -15; 0 15'
          repeatCount='indefinite'
          begin='0.1'
        />
      </circle>
      <circle fill='#0a0528' stroke='none' cx='30' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 10 ; 0 -10; 0 10'
          repeatCount='indefinite'
          begin='0.2'
        />
      </circle>
      <circle fill='#0a0528' stroke='none' cx='54' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 5 ; 0 -5; 0 5'
          repeatCount='indefinite'
          begin='0.3'
        />
      </circle>
    </svg>
  )
}

export const LoaderSpin = ({ width = '16px', height = '16px', color = '#0a0528', ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      {...props}
      width={width}
      height={height}
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke={color}
        strokeWidth='10'
        r='35'
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        />
      </circle>
    </svg>
  )
}

export const DeleteCross: FC<SvgIcon> = ({ width = '16px', height = '16px', color = '', className = undefined }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill={color || undefined}
      className={className}
    >
      <path d='M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z' />
    </svg>
  )
}
