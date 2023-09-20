import * as React from 'react'

import clsx from 'clsx'

import { Grid } from '~/components/grid'
import { IconChevronDown } from '~/components/icons'
import { ToggleButton, ToggleButtonGroup } from '~/components/toggle-buttons'
import { H3, H4, H5, Subtitle } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

const formatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  currencyDisplay: 'code',
})

function formatNumber(value: number) {
  return formatter.format(value).replace('EUR', '').trim()
}

function Divider() {
  return (
    <>
      <tr className="h-4" />
      <tr className="h-0">
        <td className="border-secondary border-t" />
        <td className="border-secondary border-t" />
      </tr>
      <tr className="h-4" />
    </>
  )
}

function Row({
  label,
  value,
  negativeValue = false,
  showCurrencySign = false,
}: {
  label: string
  value: number
  negativeValue?: boolean
  showCurrencySign?: boolean
}) {
  return (
    <tr className="text-inverse h-8 align-top text-lg font-medium leading-6">
      <td>{label}</td>
      <td className="whitespace-nowrap text-right">
        {showCurrencySign ? `€ ` : ''}
        {negativeValue ? '- ' : ''}
        {formatNumber(value)}
      </td>
    </tr>
  )
}

function OptionalRow({
  label,
  value,
  isChecked,
  onClick,
}: {
  label: string
  value: number
  isChecked: boolean
  onClick: () => void
}) {
  return (
    <tr
      className="text-inverse h-8 cursor-pointer align-top text-lg font-medium leading-6"
      onClick={onClick}
    >
      <td>
        <input
          className={clsx(
            'pointer-events-none mr-2 h-4 w-4 rounded align-middle',
            { 'opacity-30': !isChecked },
          )}
          type="checkbox"
          checked={isChecked}
          readOnly
        />
        <span
          className={clsx('align-middle', {
            'opacity-30': !isChecked,
          })}
        >
          {label}
        </span>
      </td>
      <td
        className={clsx('text-right', {
          'opacity-30': !isChecked,
        })}
      >
        {isChecked ? '- ' : ''}
        {formatNumber(value)}
      </td>
    </tr>
  )
}

type CalculationResult = {
  revenue: number
  revenueRelative: number
  salaryBase: number
  salaryGross: number
  holiday: number
  pension: number
  total: number // yearly only
  employerCharges: number
  bonus: {
    monthly: number
    remainder: number // monthly only
    remainderGross: number
    yearly: number // yearly only
  }
  expenses: {
    training: number
    travel: number
    equipment: number
  }
}

enum Period {
  Month = 'month',
  Year = 'year',
}

const averageWorkDays = 21.66666667
const unbillableDays = 38
const baseSalaryAmount = 4800
const pensionAmount = 274
const relativeRevenuePercentage = 0.7
const employerTaxPercentage = 0.18
const maxEmployerCharges = 71000

function calculate({
  period,
  rate,
  hoursPerWeek,
  usesTraining,
  usesEquipment,
  usesTravel,
}: {
  period: Period
  rate: number
  hoursPerWeek: number
  usesTraining: boolean
  usesEquipment: boolean
  usesTravel: boolean
}): CalculationResult {
  const isYearly = period === 'year'
  const workingRate = hoursPerWeek === 40 ? 1 : hoursPerWeek === 36 ? 0.9 : 0.8

  const expensesTraining = usesTraining ? 100 : 0
  const expensesTravel = usesTravel ? 200 : 0
  const expensesEquipment = usesEquipment ? 100 : 0

  const expenses = {
    training: isYearly ? expensesTraining * 12 : expensesTraining,
    travel: isYearly ? expensesTravel * 12 : expensesTravel,
    equipment: isYearly ? expensesEquipment * 12 : expensesEquipment,
  }

  const revenue = isYearly
    ? rate * 8 * workingRate * (averageWorkDays * 12 - unbillableDays)
    : rate * 8 * workingRate * (averageWorkDays - unbillableDays / 12)

  const revenueRelative = revenue * relativeRevenuePercentage
  const employerCharges = revenueRelative * employerTaxPercentage

  const salaryBase =
    (isYearly ? baseSalaryAmount * 12 : baseSalaryAmount) * workingRate
  const holiday = salaryBase * 0.08
  const pension = isYearly ? pensionAmount * 12 : pensionAmount

  // Half of the total bonus will be saved for yearly bonus
  const bonusMonthly =
    (revenueRelative - (employerCharges + salaryBase + holiday)) / 2

  const bonusRemainderGross =
    revenueRelative - (employerCharges + salaryBase + holiday + bonusMonthly)

  const bonusRemainder =
    bonusRemainderGross -
    (expenses.training + expenses.travel + expenses.equipment)

  const taxBenefit =
    employerCharges - maxEmployerCharges * employerTaxPercentage

  const bonusYearly = bonusRemainder + taxBenefit

  const salaryGross = salaryBase + holiday + pension + bonusMonthly
  const total = isYearly ? bonusYearly + salaryGross : 0

  return {
    revenue,
    revenueRelative,
    salaryBase,
    salaryGross,
    holiday,
    pension,
    total,
    employerCharges,
    expenses,
    bonus: {
      monthly: bonusMonthly,
      remainder: isYearly ? 0 : bonusRemainder,
      remainderGross: bonusRemainderGross,
      yearly: isYearly ? bonusYearly : 0,
    },
  }
}

const rates = [80, 90, 100, 110, 120, 130, 140, 150]

type Props = {
  title?: string
  subtitle?: string
}

export function Calculator({ title, subtitle }: Props) {
  const { t } = useLabels()

  const [rate, setRate] = React.useState(rates[1])
  const [period, setPeriod] = React.useState<Period>(Period.Month)
  const [hoursPerWeek, setHoursPerWeek] = React.useState<string>('40')

  const [usesTraining, setUsesTraining] = React.useState(false)
  const [usesEquipment, setUsesEquipment] = React.useState(false)
  const [usesTravel, setUsesTravel] = React.useState(false)

  const {
    revenue,
    revenueRelative,
    salaryBase,
    salaryGross,
    employerCharges,
    total,
    holiday,
    pension,
    bonus,
    expenses,
  } = calculate({
    period,
    rate,
    hoursPerWeek: Number(hoursPerWeek),
    usesTraining,
    usesTravel,
    usesEquipment,
  })

  return (
    <div
      id="fair-pay"
      className="bg-cover bg-center pt-20 pb-32 lg:pb-40"
      style={{
        backgroundImage:
          'url(https://a.storyblok.com/f/180005/1443x1100/ab21757705/bg.jpg)',
      }}
    >
      <Grid>
        <div className="col-span-full lg:text-center">
          <Subtitle variant="pink" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" inverse className="mb-8 lg:mb-20 lg:px-40">
            {title}
          </H3>
        </div>
        <div className="bg-transparent-light col-span-full flex flex-col justify-between rounded-lg px-6 py-8 backdrop-blur-lg lg:flex-row lg:p-14">
          <div className="flex flex-grow flex-col gap-y-4 lg:gap-y-8 lg:pr-20">
            <H4 as="h3" inverse>
              {t('calculator.title')}
            </H4>
            <div>
              <label
                htmlFor="rate"
                className="text-inverse mb-2 inline-block font-bold"
              >
                {t('calculator.rate')}
              </label>
              <div className="relative">
                <select
                  id="rate"
                  name="rate"
                  className={clsx(
                    'border-secondary w-full appearance-none rounded-lg border-2 bg-transparent p-5',
                    'text-lg font-bold text-white',
                    'focus:border-white focus:outline-none',
                  )}
                  defaultValue={String(rate)}
                  onChange={(event) => setRate(Number(event.target.value))}
                >
                  {rates.map((rate) => (
                    <option key={rate} value={String(rate)}>
                      &euro; {rate}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-0 right-4 bottom-0 m-auto h-6 w-6 text-white">
                  <IconChevronDown />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="workweek"
                className="text-inverse mb-2 block font-bold"
              >
                {t('calculator.workweek')}
              </label>
              <ToggleButtonGroup
                id="workweek"
                value={hoursPerWeek}
                onChange={(value) => setHoursPerWeek(value)}
              >
                <ToggleButton value="40">40</ToggleButton>
                <ToggleButton value="36">36</ToggleButton>
                <ToggleButton value="32">32</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div>
              <label
                htmlFor="period"
                className="text-inverse mb-2 block font-bold"
              >
                {t('calculator.period')}
              </label>
              <ToggleButtonGroup
                id="period"
                value={period}
                onChange={(value) => setPeriod(value as Period)}
              >
                <ToggleButton value={Period.Month}>
                  {t('calculator.monthly')}
                </ToggleButton>
                <ToggleButton value={Period.Year}>
                  {t('calculator.yearly')}
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <table className="mt-14 w-full lg:mt-0 lg:w-[410px]">
            <tbody>
              <Row label={t('calculator.revenue.average')} value={revenue} />
              <Row
                label={t('calculator.revenue.relative')}
                value={revenueRelative}
              />
              <Divider />
              <Row
                label={t('calculator.charges.employer')}
                value={employerCharges}
                negativeValue
              />
              <Divider />
              <Row label={t('calculator.salary.base')} value={salaryBase} />
              <Row label={t('calculator.holiday')} value={holiday} />
              <Row label={t('calculator.pension')} value={pension} />
              <Row label={t('calculator.bonus')} value={bonus.monthly} />
              <Divider />
              <Row
                showCurrencySign
                label={t('calculator.salary.gross')}
                value={salaryGross}
              />
              <Divider />
              <Row label="Remaining revenue" value={bonus.remainderGross} />
              <OptionalRow
                label={t('calculator.expenses.development')}
                value={expenses.training}
                isChecked={usesTraining}
                onClick={() => setUsesTraining(!usesTraining)}
              />
              <OptionalRow
                label={t('calculator.expenses.equipment')}
                value={expenses.equipment}
                isChecked={usesEquipment}
                onClick={() => setUsesEquipment(!usesEquipment)}
              />
              <OptionalRow
                label={t('calculator.expenses.travel')}
                value={expenses.travel}
                isChecked={usesTravel}
                onClick={() => setUsesTravel(!usesTravel)}
              />
              <Divider />
              {period === 'year' ? (
                <>
                  <Row
                    showCurrencySign
                    label={t('calculator.bonus.yearly')}
                    value={bonus.yearly}
                  />
                  <Row
                    showCurrencySign
                    label={t('calculator.total')}
                    value={total}
                  />
                </>
              ) : (
                <Row
                  showCurrencySign
                  label={t('calculator.bonus.remainder')}
                  value={bonus.remainder}
                />
              )}
            </tbody>
          </table>
        </div>
        <div className="col-span-full pt-8 text-center lg:pt-10">
          <H5
            as="p"
            variant="secondary"
            inverse
            dangerouslySetInnerHTML={{
              __html: t('calculator.cta', { replace: true }),
            }}
          />
        </div>
      </Grid>
    </div>
  )
}
