import * as React from 'react'

import clsx from 'clsx'

import { Select } from '~/components/form-elements'
import { Grid } from '~/components/grid'
import { SwitchToggle } from '~/components/switch-toggle'
import { H3, Subtitle } from '~/components/typography'
import { useLabels } from '~/utils/labels-provider'

const numberFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

function Divider() {
  return (
    <>
      <tr className="h-4" />
      <tr className="h-0">
        <td className="border-primary border-t border-solid" />
        <td className="border-primary border-t border-solid" />
      </tr>
      <tr className="h-4" />
    </>
  )
}

function Row({
  label,
  value,
  negativeValue = false,
}: {
  label: string
  value: number
  negativeValue?: boolean
}) {
  return (
    <tr className="text-primary h-8 font-bold">
      <td>{label}</td>
      <td className="text-right">
        {negativeValue ? '-' : ''} {numberFormatter.format(value)}
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
      className="text-primary h-8 cursor-pointer font-bold hover:bg-gray-200"
      onClick={onClick}
    >
      <td>
        <input
          className="pointer-events-none mr-2 align-middle"
          type="checkbox"
          checked={isChecked}
          readOnly
        />
        <span
          className={clsx('align-middle', {
            'line-through': !isChecked,
          })}
        >
          {label}
        </span>
      </td>
      <td className="text-right">- {numberFormatter.format(value)}</td>
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

type Period = 'month' | 'year'

const averageWorkDays = 21.66666667
const unbillableDays = 38
const baseSalaryAmount = 4800
const pensionAmount = 274
const relativeRevenuePercentage = 0.7
const employerTaxPercentage = 0.18
const maxEmployerCharges = 52000

function calculate({
  period,
  rate,
  usesTraining,
  usesEquipment,
  usesTravel,
}: {
  period: Period
  rate: number
  usesTraining: boolean
  usesEquipment: boolean
  usesTravel: boolean
}): CalculationResult {
  const isYearly = period === 'year'

  const expensesTraining = usesTraining ? 100 : 0
  const expensesTravel = usesTravel ? 200 : 0
  const expensesEquipment = usesEquipment ? 100 : 0

  const expenses = {
    training: isYearly ? expensesTraining * 12 : expensesTraining,
    travel: isYearly ? expensesTravel * 12 : expensesTravel,
    equipment: isYearly ? expensesEquipment * 12 : expensesEquipment,
  }

  const revenue = isYearly
    ? rate * 8 * (averageWorkDays * 12 - unbillableDays)
    : rate * 8 * (averageWorkDays - unbillableDays / 12)

  const revenueRelative = revenue * relativeRevenuePercentage
  const employerCharges = revenueRelative * employerTaxPercentage

  const salaryBase = isYearly ? baseSalaryAmount * 12 : baseSalaryAmount
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

  const [rate, setRate] = React.useState(rates[2])
  const [period, setPeriod] = React.useState<Period>('month')

  const [usesTraining, setUsesTraining] = React.useState(true)
  const [usesEquipment, setUsesEquipment] = React.useState(true)
  const [usesTravel, setUsesTravel] = React.useState(true)

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
    usesTraining,
    usesTravel,
    usesEquipment,
  })

  return (
    <div className="bg-primary py-10 lg:py-20">
      <Grid>
        <div className="col-span-full lg:col-span-6">
          <Subtitle variant="blue" className="mb-4">
            {subtitle}
          </Subtitle>
          <H3 as="h2" className="mb-8 lg:mb-0" variant="primary">
            {title}
          </H3>
        </div>
        <div className="col-span-full lg:col-span-6 py-4">
          <div className="mb-2 lg:mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
            <Select
              className="w-[170px]"
              label={t('calculator.rate')}
              name="rate"
              defaultValue={String(rate)}
              onChange={(event) => setRate(Number(event.target.value))}
            >
              {rates.map((rate) => (
                <option key={rate} value={String(rate)}>
                  {numberFormatter.format(rate)}
                </option>
              ))}
            </Select>
            <SwitchToggle
              className="mb-8 lg:mb-0"
              labelActive={t('calculator.yearly')}
              labelInactive={t('calculator.monthly')}
              active={period === 'year'}
              onClick={(active) => setPeriod(active ? 'month' : 'year')}
            />
          </div>
          <table className="w-full">
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
              <Row label={t('calculator.salary.gross')} value={salaryGross} />
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
                    label={t('calculator.bonus.yearly')}
                    value={bonus.yearly}
                  />
                  <Row label={t('calculator.total')} value={total} />
                </>
              ) : (
                <Row
                  label={t('calculator.bonus.remainder')}
                  value={bonus.remainder}
                />
              )}
            </tbody>
          </table>
        </div>
      </Grid>
    </div>
  )
}
