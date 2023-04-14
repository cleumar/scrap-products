#!/usr/bin/env bash
readonly SRC_PATH="src"

check_clean_architecture ()
{
  DIRECTORY_PATH="${SRC_PATH}/$1"
  UNAUTHORIZED_IMPORTS=$2
  UNAUTHORIZED_IMPORTS_COUNT=$(find ${DIRECTORY_PATH} -name "*.ts" -exec egrep -w ${UNAUTHORIZED_IMPORTS} {} \; | wc -l)
  
  if [[ "${UNAUTHORIZED_IMPORTS_COUNT}" -ne 0 ]]; then
    echo "${UNAUTHORIZED_IMPORTS_COUNT} unauthorized imports in ${DIRECTORY_PATH}:"
    find ${DIRECTORY_PATH} -name "*.ts" -exec egrep -lw ${UNAUTHORIZED_IMPORTS} {} \;
    exit 1
  fi
}

readonly UNAUTHORIZED_IMPORTS_IN_PRESENTATION="infrastructure"
readonly UNAUTHORIZED_IMPORTS_IN_USE_CASES="${UNAUTHORIZED_IMPORTS_IN_PRESENTATION}|presentation"
readonly UNAUTHORIZED_IMPORTS_IN_DOMAIN="${UNAUTHORIZED_IMPORTS_IN_USE_CASES}|use-cases"
readonly UNAUTHORIZED_IMPORTS_IN_SHARED=$UNAUTHORIZED_IMPORTS_IN_DOMAIN

check_clean_architecture "domain/entities" $UNAUTHORIZED_IMPORTS_IN_DOMAIN
check_clean_architecture "shared" $UNAUTHORIZED_IMPORTS_IN_DOMAIN
check_clean_architecture "domain/use-cases" $UNAUTHORIZED_IMPORTS_IN_USE_CASES
check_clean_architecture "presentation" $UNAUTHORIZED_IMPORTS_IN_PRESENTATION

echo "clean architecture checks = OK"
exit 0
